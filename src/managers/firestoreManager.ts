// Outer imports:
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import i18n from "../translations/i18n";

// Inner imports:
import { icons } from "../constants/icons";

// Redux:
import store, { AppThunk } from "../store/store";
import {
  setImageTransferred,
  setIsUploadingImage,
  setLoadingText,
  setRecipeImageURL,
} from "../features/addRecipe/state/addRecipeSlice";
import { generalErrorHandler } from "../features/errorHandling/state/errorHandlingActions";

// Types:
import { Recipe } from "../models/recipe";
import { FirebaseErrors } from "../models/errors";

// MARK: Generic Functions
export const addFileToCollection = (
  collection: string,
  file: any,
  completionHandler: Function
) => {
  try {
    firestore()
      .collection(collection)
      .add(file)
      .then(() => {
        completionHandler();
      });
  } catch (error) {
    console.log(error); // TODO: Error Handling
  }
};

export const updateUserAvatar = (
  collection: string,
  doc: string,
  fieldValue: string
) => {
  try {
    firestore().collection(collection).doc(doc).update({
      avatar: fieldValue,
    });
  } catch (err) {
    store.dispatch(
      generalErrorHandler({
        type: FirebaseErrors.FAILED_SAVE_AVATAR,
        message: i18n.t("errorHandling.FirebaseErrors.failedSaveAvatar"),
        icon: icons.broken_image,
      })
    );
    console.log(err);
  }
};

export const readFileFromCollection = async (
  collection: string,
  docID: string
) => {
  try {
    const docRef = await firestore().collection(collection).doc(docID).get();
    return docRef;
  } catch (error) {
    console.log(error); // TODO: Error Handling
  }
};

// MARK: Recipes Functions:
export const fetchRecipesOfUser = async (
  collectionPath: string
): Promise<Recipe[] | undefined> => {
  try {
    let items: Recipe[] = [];
    const ref = firestore().collection<Recipe>(collectionPath);
    const documents = (await ref.get()).docs;
    await Promise.all(
      documents.map(async (doc) => {
        let data = doc.data();
        try {
          let r: Recipe = {
            id: doc.id,
            name: data.name,
            image: data.image,
            duration: data.duration,
            serving: data.serving,
            category: data.category,
            ingredients: data.ingredients,
            preparationSteps: data.preparationSteps,
          };
          let url = await downloadImageFromStorage(data.image ?? "");
          r.image = url ?? null;
          items.push(r);
        } catch (err) {
          console.log("log error x");
          console.log(err); // TODO: Error Handling
        }
      })
    );
    return items;
  } catch (error) {
    console.log("log error y");
    console.log(error); // TODO: Error Handling
    return [];
  }
};

export const uploadImageToStorage =
  (completionHandler: Function): AppThunk =>
  async (dispatch, getState) => {
    const uri: string | null = getState().addRecipe.recipeImageUri;
    if (uri) {
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;

      dispatch(setIsUploadingImage(true));
      dispatch(setImageTransferred(0));

      const task = storage().ref(filename).putFile(uploadUri);
      task.on("state_changed", (snapshot) => {
        dispatch(
          setLoadingText(
            i18n.t("addRecipe.imageUploadingText") +
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
                100 +
              "%"
          )
          // setImageTransferred(
          //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
          // ),
        );
      });

      try {
        let taskResult = await task;
        dispatch(setRecipeImageURL(taskResult.metadata.fullPath));
        dispatch(setLoadingText(i18n.t("addRecipe.loaderText")));
        completionHandler();
      } catch (e) {
        console.error(e); // TODO: Error Handling
      } finally {
        dispatch(setIsUploadingImage(false));
      }
    }
  };

export const downloadImageFromStorage = async (
  imageUrl: string
): Promise<string | undefined> => {
  try {
    const url = await storage().ref(imageUrl).getDownloadURL();
    return url;
  } catch (error) {
    store.dispatch(
      generalErrorHandler({
        type: FirebaseErrors.INVALID_IMAGE_URL,
        message: i18n.t("errorHandling.FirebaseErrors.invalidImageUrl"),
        icon: icons.broken_image,
      })
    );
    console.log(error);
  }
};

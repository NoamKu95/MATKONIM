import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import i18n from "../translations/i18n";

// Redux:
import store, { AppThunk } from "../store/store";
import {
  setImageTransferred,
  setIsUploadingImage,
  setLoadingText,
  setRecipeImageURL,
} from "../features/addRecipe/state/addRecipeSlice";

// Types:
import { Recipe } from "../models/recipe";
import { useDispatch } from "react-redux";
import { addRecipe } from "../features/home/state/homeSlice";

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

export const updateFile = (
  collection: string,
  doc: string,
  field: any,
  completionHandler: Function
) => {
  firestore()
    .collection(collection)
    .doc(doc)
    .update(field)
    .then(() => {
      completionHandler();
    });
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
            image: "",
            duration: data.duration,
            serving: data.serving,
            category: data.category,
            ingredients: data.ingredients,
            preparationSteps: data.preparationSteps,
          };
          let url = await downloadImageFromStorage(data.image);
          r.image = url;
          items.push(r);
        } catch (err) {
          console.log(err); // TODO: Error Handling
        }
      })
    );
    return items;
  } catch (error) {
    // firebaseErrorHandler(error)
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
): Promise<string> => {
  const url = await storage().ref(imageUrl).getDownloadURL();
  return url;
};

export const queryFirestore = async (
  collectionPath: string,
  searchText: string | null,
  category: string | null
): Promise<Recipe[]> => {
  const routeRef = firestore().collection(collectionPath);
  const nameFilter = searchText
    ? routeRef.where("name", "==", searchText)
    : routeRef;
  const categoryFilter = category
    ? nameFilter.where("category", "==", category)
    : nameFilter;

  let filteredRecipes: Recipe[] = [];
  categoryFilter.get().then((snapshot) => {
    snapshot.docs.forEach(async (doc) => {
      let r: Recipe = {
        id: doc.id,
        name: doc.data().name,
        image: "",
        duration: doc.data().duration,
        serving: doc.data().serving,
        category: doc.data().category,
        ingredients: doc.data().ingredients,
        preparationSteps: doc.data().preparationSteps,
      };
      let url = await downloadImageFromStorage(doc.data().image);
      r.image = url;
      console.log(r);
      // filteredRecipes.push(r);
    });
  });
  return filteredRecipes;
};

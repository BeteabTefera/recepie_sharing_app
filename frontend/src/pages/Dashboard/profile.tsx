import { UILoader } from "../../components/loaders";
import cogoToast from "cogo-toast";
import { DragEvent, FormEvent, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, TextArea  } from "../../components";
import { useRecipe } from "../../hooks";
import { IRECIPE } from "../../@types";
import { ImageUploader } from "./common/image-uploader";
import { validateImageType } from "../../utils";



export const Profile = () => {
    const navigate = useNavigate();
    // const { loading, addRecipe } = useRecipe();
    const { loading, } = useRecipe();
    const [state, setState] = useState<IRECIPE>({
      title: "",
      note: "",
      description: "",
      ingredients: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };

    const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
    
        if (!validateImageType(imageFile)) {
          return cogoToast.warn("File type is wrong " + imageFile.type);
        }
    
        setImage(imageFile);
      };
    
    const handleFile = (event: FormEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        const imageFile = event.currentTarget.files[0];
        if (!validateImageType(imageFile)) {
          return cogoToast.warn("File type is wrong " + imageFile.type);
        }
    
        setImage(imageFile);
      };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      //   if (!image) {
      //     return cogoToast.error("Please add an image ");
      //   }
    
      //   // if (!state?.title || !state?.description || !state?.ingredients) {
      //   //   return cogoToast.error("Please fill the missing field ");
      //   // }
      //   const payload = {
      //     image,
      //     ...state,
      //   };
      //   await addRecipe(payload);
      //   setState({ title: "", note: "", description: "", ingredients: "" });
      //   setImage(null);
      //   navigate("/dashboard/myrecipes");
      
      //for now navigate to the dashboard
      cogoToast.success("Profile Updated");
      navigate("/dashboard/");
      };
    const onChange = (
        e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
      ) => {
        const { name, value } = e.currentTarget;
    
        setState({ ...state, [name]: value });
      };
  return (
    
    <Suspense fallback={<UILoader />}>
        <div className="text-white">
        <h2 className="font-extrabold text-xl">Your Profile</h2>

        <Form onSubmit={onSubmit} className={`mt-3 flex flex-col gap-3 md:flex-row`}>
            <div className="w-full">
                <Input
                    disabled={loading}
                    name="title"
                    placeholder="John"
                    type="text"
                    handleChange={onChange}
                    className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                />
                <Input
                    disabled={loading}
                    name="title"
                    placeholder="Doe"
                    type="text"
                    handleChange={onChange}
                    className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2`}
                />
                <Input
                    disabled={loading}
                    name="title"
                    placeholder="John@yahoo.com"
                    type="text"
                    handleChange={onChange}
                    className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2`}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <ImageUploader
                    handleDragOver={handleOnDragOver}
                    handleOnDrop={handleOnDrop}
                    handleFile={handleFile}
                    name={image?.name as string}
                    className={`bg-zinc-900 py-1 px-4 w-full  hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                />
                <TextArea
                    disabled={loading}
                    name="note"
                    placeholder="Bio"
                    onChange={onChange}
                    rows={4}
                    className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                    style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #2D3748' }}
                />
                <Button
                    disabled={loading}
                    title={loading ? "Publishing..." : "Update Profile"}
                    className={`bg-red-500 text-white hover:bg-red-600 py-1 px-6 w-full mb-4 `}
                    type="submit"
                />
            </div>
        </Form>
        </div>
    </Suspense>
 
  );
};
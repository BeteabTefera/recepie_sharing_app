import { useState, FormEvent, Suspense } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";
import { UILoader, SearchLoader } from "../../components/loaders";
import { RecipeCard, SearchBox } from "../../components";
import { NoRecipe } from "./common";
import { useRecipe } from "../../hooks";
import { IRECIPERESPONSE } from "../../@types";
import { instance } from "../../config";

export const Home = () => {
   //useswr fetcher
   const fetcher = (url: string) => instance.get(url).then((res) => res.data);
   const { data, error } = useSWR("/recipe", fetcher, { suspense: true });
 

    const { loading, searchRecipe } = useRecipe();
    

    const [query, setQuery] = useState<string>("");

    const [state, setState] = useState<IRECIPERESPONSE[]>(
      (data as unknown as IRECIPERESPONSE[]) || []
    );

    if (error) {
      console.log(error);
      cogoToast.error(error?.response?.data?.error);
      return null;
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!query) return;
      const result: IRECIPERESPONSE[] = await searchRecipe(query);
      if (result) {
        setState(result);
      }
    };

    const props = {
      title: "Recipes",
      onSearch: onSubmit,
      query,
      setQuery,
    };
  
    return (
      <Suspense fallback={<UILoader/>}>
          <div className="text-white w-full h-full">
            <SearchBox {...props}/>

            {loading ? (
              <SearchLoader />
            ) : (
              <>
                 {!!state?.length ? (
                    <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
                      {state.map((recipe: IRECIPERESPONSE, index: number) => (
                        <RecipeCard
                          key={index + recipe._id}
                          {...recipe}
                          user={recipe?.user?.email as string}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <NoRecipe />
                    </>
                  )}
              </>
            )}

          </div>
      </Suspense>
    );
  };

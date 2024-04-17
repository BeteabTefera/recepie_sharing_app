import cogoToast from "cogo-toast";
import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../components";
import { UILoader } from "../../components/loaders";
import { instance } from "../../config";
import { Button } from "../../components";
import useSWR from "swr";

export const More = () => {
  const params = useParams<{ id: string }>().id; // Get the id from the URL params
  const navigate = useNavigate(); // Use navigate to redirect after deleting the recipe

  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe/" + params, fetcher, {
    suspense: true,
  });

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

 
  return (
    <Suspense fallback={<UILoader />}>
      <div className="flex flex-col items-center">
        <Card
          isFull={true}
          id={data?._id}
          title={data?.title}
          image={data?.image?.url}
          ingredients={data?.ingredients}
          note={data?.note}
          description={data?.description}
          email={data?.user?.email}
          avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <Button
          title="Back"
          className={`bg-red-700 text-white hover:bg-orange-600 
            py-1 px-2 w-[50%]
            mt-2 // Add margin-top to separate the button from the card
            `}
          handleClick={() => navigate("/dashboard/")}
        />
      </div>
    </Suspense>
  );
};

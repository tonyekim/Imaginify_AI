import Header from "@/app/components/shared/Header";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/app/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();

  console.log(userId, "USER ID FROM AUTH");
  if (!userId) redirect("/sign-in");
  
  const user = await getUserById(userId);

  // if (!user) {
  //   console.error("User not found:", userId);
  //   redirect("/sign-in"); // Or show an error message
  //   return null;
  // }

  const transformation = transformationTypes[type];
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;

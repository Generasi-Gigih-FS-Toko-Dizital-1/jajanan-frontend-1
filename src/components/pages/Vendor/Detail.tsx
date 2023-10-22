import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@nextui-org/react";
import { AiOutlineArrowLeft, AiOutlineMail, AiOutlinePushpin, AiOutlineUser } from "react-icons/ai";

const Detail = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Detail Vendor</h2>
        <Button 
          onPress={() => navigate('/vendors')}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <VendorProfileCard className="border-b-2 border-jajanDanger py-4 mx-4" />
      <div className="flex flex-wrap py-6 mx-4 lg:w-3/4 xl:3/5 2xl:w-1/2">
        <div className="w-1/2 flex flex-col gap-y-5">
          <div>
            <h3 className="font-medium lg:text-xl">Created at</h3>
            <p className="text-sm opacity-70 lg:text-base">31/12/2023, 23.59 WIB</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Updated at</h3>
            <p className="text-sm opacity-70 lg:text-base">31/12/2023, 23.59 WIB</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Deleted at</h3>
            <p className="text-sm opacity-70 lg:text-base">-</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-y-5">
          <div>
            <h3 className="font-medium lg:text-xl">Last Latitude</h3>
            <p className="text-sm opacity-70 lg:text-base">-6.593850</p>
          </div>
          <div>
            <h3 className="font-medium lg:text-xl">Last Longtitude</h3>
            <p className="text-sm opacity-70 lg:text-base">110.668640</p>
          </div>
        </div>
      </div>
      <h2 className="mx-4 my-4 font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Jajan Stand</h2>
      <JajanStandCard className="py-4 mx-4 mb-4" />
      <div className="mx-4 w-full flex items-center gap-3 mt-5">
        <Button 
          onPress={() => navigate("/vendors/edit/1")}
          className="bg-jajanDark2 text-white rounded-md"
        >
          Edit
        </Button>
        <Button 
          className="bg-jajanDanger text-white rounded-md"
          onPress={
            () => {
              confirm("Are you sure you want to delete this vendor?") &&
              alert("Vendor deleted")
            }
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const VendorProfileCard = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-3`}>
      <div className="flex gap-x-3 md:gap-x-4 md:w-1/2 lg:w-[45%]">
        <div className="text-white rounded-full bg-[#BFBFBF] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32">
          <AiOutlineUser className="p-3 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32" />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div>
            <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">Max Mayfield</h2>
            <p className="opacity-70 text-sm sm:text-base xl:text-lg 2xl:text-xl">@max</p>
          </div>
          <Chip size="sm" className="bg-jajanWarning/50 mt-3" radius="full">
            EXP <b>9283637</b> 
          </Chip>
        </div>
      </div>
      <div className="flex flex-col justify-between max-md:border-b-2 max-md:border-jajanDanger max-md:pb-3 py-1 gap-y-1 md:gap-y-2 xl:gap-y-3 w-auto text-lg md:text-base xl:text-lg 2xl:text-xl">
        <div className="flex flex-wrap items-center">
          <AiOutlineUser className="mr-1 xl:mr-2" />
          <span className="w-4/5">Female</span>
        </div>
        <div className="flex flex-wrap items-center">
          <AiOutlineMail className="mr-1 xl:mr-2" />
          <span className="w-4/5">maxxx@mail.com</span>
        </div>
        <div className="flex flex-wrap items-center">
          <AiOutlinePushpin className="mr-1 xl:mr-2" />
          <span className="w-4/5">565 Holland Rd, Hawkins, Indiana</span>
        </div>
      </div>
      <div className="border-l-2 border-jajanDark2 min-h-full hidden md:block w-[1%]"></div>
      <div className="flex flex-col justify-between md:text-right md:w-1/4 lg:w-[30%]">
        <span className="text-base sm:text-lg xl:text-xl 2xl:text-2xl">Balance</span>
        <div>
          <span className="block text-3xl xl:text-4xl mb-1 font-semibold">IDR 1,876,000</span>
          <span className="block text-sm 2xl:text-base">Current on Wallet</span>
        </div>
      </div>
    </div>
  );
};

const JajanStandCard = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center gap-x-4 bg-jajanWarning p-4 rounded-xl md:p-5 md:gap-x-5 md:w-2/3 lg:p-8 lg:w-3/5 xl:w-[55%]`}>
      <img 
        src="https://openai-labs-public-images-prod.azureedge.net/user-jTJ7A5puDaUD79bsLHVgWCyy/generations/generation-ZXpxrA1J2HneW7qCNQEJ9wQZ/image.webp" 
        className="rounded-full aspect-square w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-32 xl:h-32"
      />
      <div className="flex flex-col justify-between gap-1 md:py-1 md:gap-2 md:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <h2 className="font-semibold text-[24px] sm:text-2xl xl:text-3xl">Mayfield Toast</h2>
        <p className="text-base xl:text-base 2xl:text-lg">Your street food maestro. Fast, tasty bites for your cravings. Don't miss out!</p>
      </div>
    </div>
  )
}

export default Detail;

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function RecipeModal({ open, setOpen }) {
  const [recipe, setRecipe] = useState(null);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const handleScrapRecipe = () => {
    console.log(url);
    setLoader(true)
    const json = {
      url: url,
    };
    try {
      axios
        .post(`${window.$BackEndURL}/api/recipe/scrap`, json)
        .then((res) => {
          console.log(res?.data);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate(`/edit-recipe/${res?.data?.recipe?._id}`)
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false)
          setOpen(false)
          setUrl("")
          

        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster richColors />
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:py-6 sm:px-6">
                  <div className="">
                    <label
                      htmlFor="url"
                      className="block mb-1 ml-2 text-sm font-medium text-gray-900"
                    >
                      Import Recipe
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="url"
                        name="url"
                        value={url}
                        placeholder="Website URL"
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full px-4 py-2 h-11 rounded-full bg-gray-200 placeholder:text-black text-black outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={handleScrapRecipe}
                        className="bg-[#FF6259] hover:bg-[#fc5950] w-20 h-11 text-white px-4 py-2 rounded-full absolute top-0 right-0"
                      >
                       {loader ?  <ClipLoader size={16} color="#ffff" /> : "Scan"  }
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

import { Container } from "@brushy/di";
import { Toaster } from "sonner";
import useSonner from "./hook/use-sonner.hook";

import { ToastContainer } from "react-toastify";
import useReactToastify from "./hook/use-react-toastify.hook";

import Button from "./components/button";
import Input from "./components/input";

export const TOAST_PROVIDER = Symbol("TOAST_PROVIDER");
export const TOAST = Symbol("TOAST");
export const BUTTON = Symbol("BUTTON");
export const INPUT = Symbol("INPUT");

const core = new Container({
  providers: [
    {
      provide: BUTTON,
      useValue: Button,
    },
    {
      provide: INPUT,
      useValue: Input,
    },
    {
      provide: TOAST,
      useFactory: () => {
        return useSonner();
      }, // options (useSonner | useReactToastify)
    },
    {
      provide: TOAST_PROVIDER,
      useValue: Toaster, //options (ToastContainer  | Toaster),
      lifecycle: "immutable",
    },
  ],
});

export default core;

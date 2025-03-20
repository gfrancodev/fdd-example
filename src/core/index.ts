import { Container } from "@brushy/di";
import { Toaster } from "sonner";
import useSonner from "./hooks/use-sonner";
import Button from "./components/button";
import Input from "./components/input";
import Header from "./components/header";
import Layout from "./components/layout";
import EmptyState from "./components/empty-state";
import HelpButton from "./components/help-button";
import CreateGroupButton from "./components/create-group-button";
import LoadingPlaceholder from "./components/skeletons/loading-placeholder.skeleton";
import LoadingButtonSkeleton from "./components/skeletons/loading-button.skeleton";
import LoadingEffect from "./components/skeletons/loading-effect.skeleton";

export const TOAST_PROVIDER = Symbol("TOAST_PROVIDER");
export const TOAST = Symbol("TOAST");
export const BUTTON = Symbol("BUTTON");
export const INPUT = Symbol("INPUT");
export const HEADER = Symbol("HEADER");
export const LAYOUT = Symbol("LAYOUT");
export const EMPTY_STATE = Symbol("EMPTY_STATE");
export const HELP_BUTTON = Symbol("HELP_BUTTON");
export const CREATE_GROUP_BUTTON = Symbol("CREATE_GROUP_BUTTON");
export const LOADING_PLACEHOLDER = Symbol("LOADING_PLACEHOLDER");
export const LOADING_EFFECT = Symbol("LOADING_EFFECT");
export const LOADING_BUTTON_SKELETON = Symbol("LOADING_BUTTON_SKELETON");

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
      },
    },
    {
      provide: TOAST_PROVIDER,
      useValue: Toaster,
      lifecycle: "immutable",
    },
    {
      provide: HEADER,
      useValue: Header,
    },
    {
      provide: LAYOUT,
      useValue: Layout,
    },
    {
      provide: EMPTY_STATE,
      useValue: EmptyState,
    },
    {
      provide: HELP_BUTTON,
      useValue: HelpButton,
    },
    {
      provide: CREATE_GROUP_BUTTON,
      useValue: CreateGroupButton,
    },
    {
      provide: LOADING_PLACEHOLDER,
      useValue: LoadingPlaceholder,
    },
    {
      provide: LOADING_BUTTON_SKELETON,
      useValue: LoadingButtonSkeleton,
    },
    {
      provide: LOADING_EFFECT,
      useValue: LoadingEffect,
    },
  ],
});

export default core;
export * from "./components/conditional";

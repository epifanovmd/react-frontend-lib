import * as React from "react";
import { useMemo } from "react";
import { stringToLowerCase } from "./string";

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

const filterElements = (
  peers: React.ReactNode | undefined,
  predicate?: (element: React.ReactElement) => boolean,
): React.ReactElement[] =>
  generateArray(function* () {
    for (const c of toIterable(peers)) {
      if (c && React.isValidElement(c) && (!predicate || predicate(c))) {
        yield c as React.ReactElement;
      }
    }
  });

type IReactComponent<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

// Получить тип пропсов по типу компонента
type ReactComponentProps<TComponent> =
  TComponent extends React.FunctionComponent<infer P>
    ? P
    : TComponent extends React.ComponentClass<infer P>
    ? P
    : never;

type TCompoundProps<
  P,
  TComponent extends IReactComponent<P>,
  TParams extends keyof TComponent,
> = {
  [K in TParams as `${Uncapitalize<string & K>}`]?: ReactComponentProps<
    TComponent[K]
  >;
};

interface TChildren {
  $children?: React.ReactNode[];
}

// В render используй useCompoundProps
export function getCompoundProps<
  P,
  TComponent extends IReactComponent<P>,
  TParams extends keyof TComponent,
>(
  props: P,
  compoundComponent: TComponent,
  ...parameters: TParams[]
): TCompoundProps<P, TComponent, TParams> & TChildren {
  const result: TCompoundProps<P, TComponent, TParams> & TChildren = {};
  const children = (props as any).children;

  const restChildren: React.ReactNode[] = [];

  for (const el of filterElements(children)) {
    let isCompound = false;

    for (const key of parameters) {
      if (el.type === (compoundComponent as any)[key]) {
        (result as any)[stringToLowerCase(key as string)] = el.props;
        isCompound = true;
        break;
      }
    }
    if (!isCompound) {
      restChildren.push(el);
    }
  }

  return {
    ...result,
    $children: restChildren,
  };
}

export function useCompoundProps<
  P,
  TComponent extends IReactComponent<P>,
  TParams extends keyof TComponent,
>(
  props: P,
  compoundComponent: TComponent,
  ...parameters: TParams[]
): TCompoundProps<P, TComponent, TParams> & TChildren {
  return useMemo(
    () => getCompoundProps(props, compoundComponent, ...parameters),
    // eslint-disable-next-line
    [(props as any).children],
  );
}

function isIterable<T>(iterable: any): iterable is Iterable<T> {
  return (
    typeof iterable === "object" &&
    iterable !== null &&
    typeof (iterable as any)[Symbol.iterator] === "function"
  );
}

function* toIterable(children: React.ReactNode | undefined) {
  if (!isIterable(children)) {
    yield children;
  } else {
    const array = React.Children.toArray(children);

    for (const item of array) {
      yield item;
    }
  }
}

function generateArray<R>(generator: () => IterableIterator<R>): R[] {
  return Array.from(generator());
}

# [Force Dev](http://force-dev.ru) - React Frontend Library

# Components

## ContextItem

### IContextItemProps

#### Наследуется от `React.HTMLAttributes<HTMLDivElement>`

| Property | Description         | Type                                                            | Default      | Version |
|----------|---------------------|-----------------------------------------------------------------|--------------|---------|
| ctx?     | Контекст компонента | `T`                                                             | `undefined`  |         |
| onClick? | Событие нажатия     | `(context: T, event: React.MouseEvent<HTMLDivElement>) => void` | `undefined`  |         |

#### example

```jsx
<ContextItem ctx={/* some data */} onClick={(ctx, event) => {
  console.log("ctx", ctx);
}} /* HTMLDivAttributes */>
  ...
</ContextItem>
```

## Button

### IButtonProps

#### Наследуется от `IContextItemProps`

| Property     | Description           | Type                                                                               | Default          | Version |
|--------------|-----------------------|------------------------------------------------------------------------------------|------------------|---------|
| title?       | Текст                 | `string`                                                                           |                  |         |
| disabled?    | Доступность           | `boolean`                                                                          | `false`          |         |
| buttonStyle? | Стиль кнопок          | `button-primary` `button-primary-light` `button-green` `button-gray` `button-link` | `button-primary` |         |
| cnPrefix? | Префикс для className           | `string`                                                                           | `undefined`      |         |

#### example

```jsx
<Button disabled={true} buttonStyle={"button-gray"} /* Button props */>
  Gray Disable
</Button>
```

## Checkbox

### ICheckboxProps

#### Наследуется от `Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>`

| Property  | Description                     | Type                                                                | Default          | Version |
|-----------|---------------------------------|---------------------------------------------------------------------|------------------|---------|
| checked?  | Указывает, установлен ли флажок | `boolean`                                                           | `undefined`      |         |
| cnPrefix? | Префикс для className           | `string`                                                            | `undefined`      |         |
| disabled? | Доступность                     | `boolean`                                                           | `button-primary` |         |
| onChange? | Соытие изменения флажка         | `(checked: boolean, value?: string &vert; number, ctx?: T) => void` | `undefined`      |         |
| title?    | Текст                           | `string`                                                            | ""               |         |
| value?    | Значение                        | `string &vert; number`                                              | `undefined`      |         |
| ctx?      | Контекст чекбокс кнопки         | `T`                                                                 | `undefined`      |         |

### Checkbox Compound

| Compound          | Type                                                                       |
|-------------------|----------------------------------------------------------------------------|
| Checkbox.Checkbox | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Checkbox.Active   | `(props: PropsWithChildren) => null`                                       |
| Checkbox.UnActive | `(props: PropsWithChildren) => null;`                                      |
| Checkbox.Title    | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Checkbox.Button   | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Checkbox.Group    | `typeof CheckboxGroup`                                                     |

#### example

```jsx
<Checkbox
  title={"Чекбокс"}
  onChange={(checked, value, ctx) => console.log("checked = ", checked, ", VALUE = ", value, ", ctx = ", ctx)}>
  <Checkbox.Button /* Checkbox button props */ />
  <Checkbox.Checkbox /* Checkbox checkbox props */ />
  <Checkbox.Active>
    // Icon in Children
    <CheckBoldIcon />
  </Checkbox.Active>
  <Checkbox.UnActive>
    // Icon in Children
    <CheckBoldIcon />
  </Checkbox.UnActive>
  <Checkbox.Title /* Checkbox title props */ />
</Checkbox>
```

## CheckboxGroup

### ICheckboxGroupProps\<T extends any = unknown>

#### Наследуется от `Omit<ICheckboxProps, "onChange" | "defaultValue" | "value">`

| Property      | Description                              | Type                                                 | Default      | Version |
|---------------|------------------------------------------|------------------------------------------------------|--------------|---------|
| defaultValue  | Дефолтные значения установленных флажков | `(string &vert; number)[]`                           | `undefined`  |         |
| items         | Массив чекбоксов                         | `RequiredKeys<ICheckboxProps<T>, "value">[]`         | `[]`         |         |
| onChange?     | Событие изменения выбранных чекбоксов    | `(value: (string &vert; number)[], ctx?: T) => void` | `undefined`  |         |
| value?        | Значения установленных флажков           | `(string &vert; number)[]`                           | `undefined`  |         |

### CheckboxGroup Compound

| Compound             | Type                                                                        |
|----------------------|-----------------------------------------------------------------------------|
| CheckboxGroup.Wrap   | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null`  |

#### example

```jsx
<Checkbox.Group
  defaultValue={[2]}
  onChange={(value, ctx) => console.log("VALUE = ", value, ", ctx = ", ctx)}
  items={[
    {
      title: "Checkbox button 1",
      value: 1,
      ctx: { a: "str" },
    },
    {
      title: "Checkbox button 2",
      value: 2,
    },
    {
      title: "Checkbox button 3",
      value: 3,
    },
    {
      title: "Checkbox button 4",
      value: 4,
    },
  ]}
  // other checkbox props
>
  <Checkbox.Group.Wrap style={{ display: "flex" }} /* Checkbox group wrap props */ />
  <Checkbox.Button /* Checkbox button props */ />
</Checkbox.Group>
```

## Input

### IInputProps

#### Наследуется от `React.InputHTMLAttributes<HTMLInputElement>`

| Property  | Description              | Type      | Default            | Version |
|-----------|--------------------------|-----------|--------------------|---------|
| touch?    | Был ли фокус на элементе | `boolean` | `undefined`        |         |
| error?    | Текст ошибки             | `string`  | `undefined`        |         |
| cnPrefix? | Префикс для className    | `string`  | `undefined`        |         | 

### Input Compound

| Compound          | Type                                                                       |
|-------------------|----------------------------------------------------------------------------|
| Input.Wrap        | `(props: React.HTMLAttributes<HTMLDivElement>) => null`                    |
| Input.Error       | `(props: React.HTMLAttributes<HTMLDivElement>) => null`                    |
| Input.Input       | `(props: React.InputHTMLAttributes<HTMLInputElement>) => null`             |
| Input.RightIcon   | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Input.Placeholder | `typeof Placeholder`                                                       |

#### example

```jsx
<Input
  placeholder={"Текстовое поле"}
  onFocus={console.log}
  touch={true}
  error={"Ошибка"}
  /* Input props */
>
  <Input.Placeholder /* Placeholder props */>
    <Input.Placeholder.Active /* Placeholder active props */ />
  </Input.Placeholder>
  <Input.Wrap /* Placeholder wrap props */ />
  <Input.Error /* Placeholder error props */ />
  <Input.RightIcon /* Placeholder rightIcon props */>
    <CloseCircleIcon onClick={() => setItem([])} /* Svg props */ />
  </Input.RightIcon>
</Input>
```

## Modal

### IModalProps

#### Наследуется от `React.HTMLAttributes<HTMLDivElement>`

| Property       | Description                                                             | Type          | Default            | Version |
|----------------|-------------------------------------------------------------------------|---------------|--------------------|---------|
| disablePortal? | Если True, то смонтировать в месте использования, иначе в корне проекта | `boolean`     | `undefined`        |         |
| open?          | Открыто ли модальное окно                                               | `boolean`     | `undefined`        |         |
| onClose?       | Событие закрытия модального окна                                        | `() => void`  | `undefined`        |         | 
| overlayClose?  | Закрывать ли при клике вне модального кона                              | `boolean`     | `undefined`        |         | 
| escapeClose?   | Закрывать ли по нажатию кнопки ESC                                      | `boolean`     | `undefined`        |         | 
| cnPrefix?      | Префикс для className                                                   | `string`      | `undefined`        |         | 

### Modal Compound

| Compound             | Type                                                            |
|----------------------|-----------------------------------------------------------------|
| Modal.Transition     | `(props: Partial<CSSTransitionProps>) => null`                  |
| Modal.Overlay        | `(props: React.HTMLAttributes<HTMLDivElement>) => null`         |
| Modal.Content        | `(props: React.HTMLAttributes<HTMLDivElement>) => null`         |

#### example

```jsx
<Modal open={true} onClose={() => console.log("close")} overlayClose={true} /* other modal props*/>
  <Modal.Overlay /* Modal overlay props */ />
  <Modal.Content /* Modal content props */ />
  // Children as modal content
  <div>Content</div>
</Modal>
```

## Placeholder

### IPlaceholderProps

#### Наследуется от `React.HTMLAttributes<HTMLDivElement>`

| Property        | Description             | Type          | Default          | Version |
|-----------------|-------------------------|---------------|------------------|---------|
| isFocus?        | В фокусе ли плэйсхолдер | `boolean`     | `undefined`      |         |
| placeholder?    | Текст плэйсхолдера      | `string`      | `undefined`      |         |
| cnPrefix?       | Префикс для className   | `string`      | `undefined`      |         | 

### Modal Compound

| Compound                | Type                                   |
|-------------------------|----------------------------------------|
| Placeholder.Active      | `(props: IPlaceholderProps) => null`   |

#### example

```jsx
<Placeholder
  placeholder={"placeholder"}
  isFocus={true}
  onClick={() => console.log("click")}
  /* other placeholder props*/
/>
```

## Radio

### IRadioProps\<T extends any = unknown>

#### Наследуется от `Partial<Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>`

| Property  | Description                     | Type                                                                | Default          | Version |
|-----------|---------------------------------|---------------------------------------------------------------------|------------------|---------|
| checked?  | Указывает, установлен ли флажок | `boolean`                                                           | `undefined`      |         |
| cnPrefix? | Префикс для className           | `string`                                                            | `undefined`      |         |
| disabled? | Доступность                     | `boolean`                                                           | `button-primary` |         |
| onChange? | Соытие изменения флажка         | `(checked: boolean, value?: string &vert; number, ctx?: T) => void` | `undefined`      |         |
| title?    | Текст                           | `string`                                                            | ""               |         |
| value?    | Значение                        | `string &vert; number`                                              | `undefined`      |         |
| ctx?      | Контекст радио кнопки           | `T`                                                                 | `undefined`      |         |

### Radio Compound

| Compound        | Type                                                                       |
|-----------------|----------------------------------------------------------------------------|
| Radio.Radio     | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Radio.Active    | `(props: PropsWithChildren) => null`                                       |
| Radio.UnActive  | `(props: PropsWithChildren) => null;`                                      |
| Radio.Title     | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Radio.Button    | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| Radio.Group     | `typeof RadioGroup`                                                        |

#### example

```jsx
<Radio
  title={"Радио кнопка"}
  onChange={(checked, value, ctx) => console.log("checked = ", checked, ", VALUE = ", value, ", ctx = ", ctx)}>
  <Radio.Button /* Radio button props */ />
  <Radio.Radio /* Radio checkbox props */ />
  <Radio.Active>
    // Icon in Children
    <CheckBoldIcon />
  </Radio.Active>
  <Radio.UnActive>
    // Icon in Children
    <CheckBoldIcon />
  </Radio.UnActive>
  <Radio.Title /* Radio title props */ />
</Radio>
```

## RadioGroup

### IRadioGroupProps\<T extends any = unknown>

#### Наследуется от `Omit<IRadioProps, "onChange" | "defaultValue">`

| Property      | Description                              | Type                                         | Default                    | Version     |
|---------------|------------------------------------------|----------------------------------------------|----------------------------|-------------|
| defaultValue  | Дефолтные значения установленных флажков | `string &vert; number`                       | `undefined`                |             |
| items         | Массив радио кнопок                      | `RequiredKeys<IRadioProps<T>, "value">[]`    | `[]`                       |             |
| onChange?     | Событие изменения выбранных радио кнопок | `(value: string                              | number, ctx?: T) => void`  | `undefined` |

### RadioGroup Compound

| Compound         | Type                                                                        |
|------------------|-----------------------------------------------------------------------------|
| RadioGroup.Wrap  | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null`  |

#### example

```jsx
<Radio.Group
  onChange={(value, ctx) => console.log("VALUE = ", value, ", ctx = ", ctx)}
  defaultValue={2}
  // value={3}
  items={[
    {
      title: "Radio button 1",
      value: 1,
      ctx: { a: "str" },
    },
    {
      title: "Radio button 2",
      value: 2,
    },
    {
      title: "Radio button 3",
      value: 3,
    },
    {
      title: "Radio button 4",
      value: 4,
    },
  ]}
  // other radio props
>
  <Radio.Group.Wrap style={{ display: "flex" }} /* Radio group wrap props */ />
  <Radio.Button /* Radio button props */ />
</Radio.Group>
```

## Select

### ISelectProps

#### Наследуется от `Omit<React.HTMLAttributes<HTMLDivElement>, "onBlur" | "onChange">`

| Property     | Description                                           | Type                                                           | Default      | Version |
|--------------|-------------------------------------------------------|----------------------------------------------------------------|--------------|---------|
| cnPrefix?    | Префикс для className                                 | `string`                                                       | `undefined`  |         |
| error?       | Текст ошибки                                          | `string`                                                       | `undefined`  |         |
| items        | Массив элементов выпадающего списка                   | `ISelectItem[]`                                                | `[]`         |         |
| name?        | Имя элемента ввода                                    | `string`                                                       | `undefined`  |         |
| onBlur?      | Кастомное событие потери фокуса                       | `(name: string) => void`                                       | `undefined`  |         |
| onChange?    | Событие выбора элемента выпадающего списка            | `(value: ISelectItem, name?: string) => void`                  | `undefined`  |         |
| placeholder? | Текст плэйсхолдера                                    | `string`                                                       | `undefined`  |         |
| readOnly?    | Если True, то только для чтения                       | `boolean`                                                      | `undefined`  |         |
| renderItem?  | Функция рендера катомного элемента выпадающего списка | `(props: ISelectItemProps) => JSX.Element`                     | `undefined`  |         |
| renderValue? | Функция для рендера выбранного элемента               | `(selected?: ISelectItem &vert; ISelectItem[]) => JSX.Element` | `undefined`  |         |
| selected?    | Выбранные элементы (один или массив)                  | `ISelectItem &vert; ISelectItem[]`                             | `undefined`  |         |
| touch?       | Был ли фокус на элементе                              | `boolean`                                                      | `undefined`  |         |

### ISelectItem
| Property | Description                           | Type                         | Default      | Version |
|----------|---------------------------------------|------------------------------|--------------|---------|
| key      | Значение элемента выпадающего списка  | `string`                     | `undefined`  |         |
| label    | Текст элемента выпадающего списка     | `string`                     | `undefined`  |         |


### Select Compound

| Compound               | Type                                                                       |
|------------------------|----------------------------------------------------------------------------|
| RadioGroup.Empty       | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| RadioGroup.Error       | `(props: React.HTMLAttributes<HTMLDivElement>) => null`                    |
| RadioGroup.Icon        | `(props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => null` |
| RadioGroup.Item        | `(props: ISelectItemProps) => null`                                        |
| RadioGroup.List        | `(props: React.HTMLAttributes<HTMLDivElement>) => null`                    |
| RadioGroup.Placeholder | `(props: IPlaceholderProps) => null`                                       |
| RadioGroup.Search      | `(props: IInputProps) => null`                                             |
| RadioGroup.Transition  | `(props: CSSTransitionProps) => null`                                      |
| RadioGroup.Value       | `(props: React.HTMLAttributes<HTMLDivElement>) => null`                    |

#### example

```jsx
<Select
  placeholder={"Выпадающий список"}
  selected={item}
  items={[
    {
      key: "1",
      label: "1",
    },
    {
      key: "2",
      label: "2",
    },
  ]}
  onChange={onSetItem}
  // other select props
>
  <Select.Transition timeout={200} /* Select transition props */ />
  <Select.Icon /* Select icon props */>
    <CloseCircleIcon onClick={() => setItem([])} /* Svg props */ />
  </Select.Icon>

  <Select.Error /* Select error props */ />
  <Select.Placeholder /* Select placeholder props */ />
  <Select.Search /* Select search props */ />
  <Select.Item /* Select item props */ />
  <Select.List /* Select list props */ />
  <Select.Value /* Select value props */ />
</Select>
```


## Textarea

### ITextAreaProps

#### Наследуется от `TextAreaProps`

| Property  | Description              | Type      | Default            | Version |
|-----------|--------------------------|-----------|--------------------|---------|
| touch?    | Был ли фокус на элементе | `boolean` | `undefined`        |         |
| error?    | Текст ошибки             | `string`  | `undefined`        |         |
| cnPrefix? | Префикс для className    | `string`  | `undefined`        |         | 

### Input Compound

| Compound              | Type                                                    |
|-----------------------|---------------------------------------------------------|
| Textarea.Wrap         | `(props: React.HTMLAttributes<HTMLDivElement>) => null` |
| Textarea.Error        | `(props: React.HTMLAttributes<HTMLDivElement>) => null` |
| Textarea.Textarea     | `(props: TextAreaProps) => null`                        |
| Textarea.Placeholder  | `typeof Placeholder`                                    |

#### example

```jsx
<Textarea
  autoSize={true}
  placeholder={"Текстовое поле"}
  onFocus={console.log}
  // other textarea props
>
  <Textarea.Placeholder /* Textarea placeholder props */ >
    <Textarea.Placeholder.Active /* Textarea placeholder active props */ />
  </Textarea.Placeholder>
  <Textarea.Wrap /* Textarea wrap props */ />
  <Textarea.Error /* Textarea error props */ />
</Textarea>
```

License
----

MIT

**Free Software, Good Work!**

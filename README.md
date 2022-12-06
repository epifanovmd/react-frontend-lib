# [Force Dev](http://force-dev.ru) - React Frontend Library


# Components
## ContextItem

### IContextItemProps
#### Наследуется от `React.HTMLAttributes<HTMLDivElement>`
| Property | Description         | Type                                                            | Default      | Version |
|----------|---------------------|-----------------------------------------------------------------|--------------|---------|
| ctx      | Контекст компонента | `T`                                                             | `undefined`  |         |
| onClick  | Событие нажатия     | `(context: T, event: React.MouseEvent<HTMLDivElement>) => void` | `undefined`  |         |

#### example

```jsx
<ContextItem ctx={/* some data */} onClick={(ctx, event) => { console.log("ctx", ctx); }}>
  ...
</ContextItem>
```

## Button

### IButtonProps

#### Наследуется от `IContextItemProps`
| Property    | Description           | Type                                                                               | Default          | Version |
|-------------|-----------------------|------------------------------------------------------------------------------------|------------------|---------|
| title       | Текст                 | string                                                                             |                  |         |
| disabled    | Доступность           | boolean                                                                            | false            |         |
| buttonStyle | Стиль кнопок          | `button-primary` `button-primary-light` `button-green` `button-gray` `button-link` | `button-primary` |         |
| cnPrefix    | Префикс для className | string                                                                             | ""               |         |

#### example

```jsx
<Button disabled={true} buttonStyle={"button-gray"}>
  Gray Disable
</Button>
```

License
----

MIT

**Free Software, Good Work!**

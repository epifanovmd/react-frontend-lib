import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Input,
  ISelectItem,
  Modal,
  Select,
  Textarea,
  Button,
  Checkbox,
} from "./ui";
import { useBooleanState } from "../common";
import { ContextItem } from "./common";
import { CloseCircleIcon } from "react-frontend-lib-icons";

export const Playground: FC = observer(() => {
  const [item, setItem] = useState<ISelectItem[]>([]);
  const [open, onOpen, onClose] = useBooleanState();

  const onSetItem = (item: ISelectItem) => {
    setItem(state => [...(state || []), item]);
  };

  return (
    <div style={{ paddingBottom: 200 }}>
      <div>
        <div>Кнопки</div>
        <br />

        <Button ctx={{ data: "string" }} onClick={console.log}>
          Primary
        </Button>
        <Button disabled={true}>Primary Disable</Button>
        <br />
        <Button buttonStyle={"button-gray"}>Gray</Button>
        <Button disabled={true} buttonStyle={"button-gray"}>
          Gray Disable
        </Button>
        <br />
        <Button buttonStyle={"button-primary-light"}>PrimaryLight</Button>
        <Button disabled={true} buttonStyle={"button-primary-light"}>
          PrimaryLight Disable
        </Button>
        <br />
        <Button buttonStyle={"button-green"}>Green</Button>
        <Button disabled={true} buttonStyle={"button-green"}>
          Green Disable
        </Button>
        <br />
        <Button buttonStyle={"button-link"}>Green</Button>
        <Button disabled={true} buttonStyle={"button-link"}>
          Green Disable
        </Button>
        <br />
      </div>
      <br />
      <br />

      <ContextItem ctx={["12"]} onClick={onOpen}>
        <Button>Модальное окно</Button>
      </ContextItem>
      <br />

      <div>Элеменнты ввода</div>
      <br />

      <Checkbox title={"Чекбокс"} />

      <br />

      <Input
        placeholder={"Пароль"}
        onFocus={console.log}
        touch={true}
        error={"Ошибка"}
        type={"password"}
      >
        <Input.Placeholder>
          <Input.Placeholder.Active />
        </Input.Placeholder>
        <Input.Wrap />
        <Input.Error />
        <Input.RightIcon></Input.RightIcon>
      </Input>

      <br />

      <Input
        placeholder={"Текстовое поле"}
        onFocus={console.log}
        touch={true}
        error={"Ошибка"}
      >
        <Input.Placeholder>
          <Input.Placeholder.Active />
        </Input.Placeholder>
        <Input.Wrap />
        <Input.Error />
        <Input.RightIcon>
          <CloseCircleIcon onClick={() => setItem([])} />
        </Input.RightIcon>
      </Input>
      <br />

      <Textarea
        autoSize={true}
        placeholder={"Текстовое поле"}
        onFocus={console.log}
      >
        <Textarea.Placeholder>
          <Textarea.Placeholder.Active />
        </Textarea.Placeholder>
        <Textarea.Wrap />
        <Textarea.Error />
      </Textarea>

      <br />
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
        touch={true}
        error={"Ошибка"}
        onChange={onSetItem}
      >
        <Select.Search />
        <Select.Transition timeout={200} />
        <Select.Error />
      </Select>

      <br />

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
      >
        <Select.Transition timeout={200} />
        <Select.Icon>
          <CloseCircleIcon onClick={() => setItem([])} />
        </Select.Icon>
        <Select.Error />
      </Select>

      <Modal open={open} onClose={onClose} overlayClose={true}>
        <Modal.Overlay />
        <Modal.Content />
        <div>Content</div>
      </Modal>
    </div>
  );
});

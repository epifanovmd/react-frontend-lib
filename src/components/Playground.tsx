import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Input, ISelectItem, Modal, Select, Textarea } from "./ui";
import { useBooleanState } from "../common";
import { Col, ContextItem } from "./common";
import { Button } from "./ui/button";

export const Playground: FC = observer(() => {
  const [item, setItem] = useState<ISelectItem[]>([]);
  const [open, onOpen, onClose] = useBooleanState();

  const onSetItem = (item: ISelectItem) => {
    setItem(state => [...(state || []), item]);
  };

  return (
    <Col paddingBottom={200}>
      <div>
        <div>Кнопки</div>
        <br />

        <Button ctx={{ data: "string" }} onClick={console.log}>
          Primary
        </Button>
        <Button disable={true}>Primary Disable</Button>
        <br />
        <Button buttonStyle={"Gray"}>Gray</Button>
        <Button disable={true} buttonStyle={"Gray"}>
          Gray Disable
        </Button>
        <br />
        <Button buttonStyle={"PrimaryLight"}>PrimaryLight</Button>
        <Button disable={true} buttonStyle={"PrimaryLight"}>
          <Button.Disable bg={"red"} color={"#fff"} />
          PrimaryLight Disable
        </Button>
        <br />
        <Button buttonStyle={"Green"}>Green</Button>
        <Button disable={true} buttonStyle={"Green"}>
          Green Disable
        </Button>
        <br />
        <Button buttonStyle={"Link"}>Green</Button>
        <Button disable={true} buttonStyle={"Link"}>
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

      <Input
        placeholder={"Текстовое поле"}
        onFocus={console.log}
        touch={true}
        error={"Ошибка"}
      >
        <Input.Placeholder color={"black"}>
          <Input.Placeholder.Active color={"green"} />
        </Input.Placeholder>
        <Input.Wrap />
        <Input.Error bg={"yellow"} />
      </Input>
      <br />

      <Textarea
        autoSize={true}
        placeholder={"Текстовое поле"}
        onFocus={console.log}
        touch={true}
        error={"Ошибка"}
      >
        <Textarea.Placeholder color={"black"}>
          <Textarea.Placeholder.Active color={"green"} />
        </Textarea.Placeholder>
        <Textarea.Wrap />
        <Textarea.Error bg={"yellow"} />
      </Textarea>

      <br />
      <Select
        mt={16}
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
        <Select.Transition timeout={200} />
        <Select.Error color={"brown"} />
      </Select>

      <Modal open={open} onClose={onClose}>
        <Modal.Overlay bg={"red"} />
        <Modal.Content bg={"yellow"} />
        <div>Content</div>
        <div>
          <Select
            mt={16}
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
              {
                key: "3",
                label: "3",
              },
            ]}
            touch={true}
            error={"Ошибка"}
            onChange={onSetItem}
          >
            <Select.Transition timeout={300} />
            <Select.Error color={"brown"} />
          </Select>
        </div>
      </Modal>
    </Col>
  );
});

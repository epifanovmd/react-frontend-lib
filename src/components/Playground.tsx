import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Input, ISelectItem, Modal, Select } from "./ui";
import { useBooleanState } from "../common";
import { ContextItem } from "./common";
import { Button } from "./ui/button";

export const Playground: FC = observer(() => {
  const [item, setItem] = useState<ISelectItem[]>([]);
  const [open, onOpen, onClose] = useBooleanState();

  const onSetItem = (item: ISelectItem) => {
    setItem(state => [...(state || []), item]);
  };

  return (
    <div>
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
        <Button>Открыть модальное окно</Button>
      </ContextItem>
      <Input placeholder={"435"} onFocus={console.log}>
        <Input.Placeholder color={"black"}>
          <Input.Placeholder.Active color={"green"} />
        </Input.Placeholder>
        <Input.Wrap />
        <Input.Error bg={"yellow"} />
      </Input>
      <Select
        mt={16}
        placeholder={"123"}
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
        <Select.Transition timeout={300} classNames={"modal"} />
        <Select.Error color={"brown"} />
      </Select>

      <Modal open={open} onClose={onClose}>
        <Modal.Overlay bg={"red"} />
        <Modal.Content bg={"yellow"} />
        <div>Content</div>
      </Modal>
    </div>
  );
});

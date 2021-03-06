/* eslint-disable */
import React, { useState, createRef, useEffect, useMemo } from "react";
import "./Version2.css";

const KEY_CODE = {
  BACKSPACE: 8,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  DELETE: 46
};

const Version2 = ({ length = 4, onChange = () => {}, placeholder = "·" }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [value, setValue] = useState(new Array(length).fill(placeholder));
  const [done, setDone] = useState(false);

  const codeInputRef = createRef();
  const itemsRef = useMemo(
    () => new Array(length).fill(null).map(() => createRef()),
    [length]
  );

  const isCodeRegex = new RegExp(`^[0-9]{${length}}$`);

  const getItem = index => itemsRef[index].current;
  const focusItem = index => getItem(index).focus();
  const blurItem = index => getItem(index).blur();

  const onItemFocus = index => () => {
    setActiveIndex(index);
    if (codeInputRef.current) codeInputRef.current.focus();
  };

  const onInputKeyUp = ({ key, keyCode }) => {
    const newValue = [...value];
    const nextIndex = activeIndex + 1;
    const prevIndex = activeIndex - 1;

    const codeInput = codeInputRef.current;
    const currentItem = getItem(activeIndex);

    const isLast = nextIndex === length;
    const isDeleting =
      keyCode === KEY_CODE.DELETE || keyCode === KEY_CODE.BACKSPACE;

    // keep items focus in sync
    onItemFocus(activeIndex);

    // on delete, replace the current value
    // and focus on the previous item
    if (isDeleting) {
      newValue[activeIndex] = placeholder;
      setValue(newValue);

      if (activeIndex > 0) {
        setActiveIndex(prevIndex);
        focusItem(prevIndex);
      }

      return;
    }

    // if the key pressed is not a number
    // don't do anything
    if (Number.isNaN(+key)) return;

    // reset the current value
    // and set the new one
    if (codeInput) codeInput.value = "";
    newValue[activeIndex] = key;
    setValue(newValue);

    if (!isLast) {
      setActiveIndex(nextIndex);
      focusItem(nextIndex);
      return;
    }

    if (codeInput) codeInput.blur();
    if (currentItem) currentItem.blur();

    setActiveIndex(-1);
  };

  const onInputChange = e => {
    const { value: changeValue } = e.target;
    const isCode = isCodeRegex.test(changeValue);

    if (!isCode) return;
    setValue(changeValue.split(""));
    blurItem(activeIndex);
  };

  const onInputBlur = () => {
    if (activeIndex === -1) return;

    blurItem(activeIndex);
    setActiveIndex(-1);
    if (activeIndex === length - 1) {
      setDone(true);
    }
  };

  useEffect(() => {
    const codeInput = codeInputRef.current;
    if (!codeInput) return;

    const onPaste = e => {
      e.preventDefault();

      const pastedString = e.clipboardData.getData("text");
      if (!pastedString) return;

      const isNumber = !Number.isNaN(+pastedString);
      if (isNumber) setValue(pastedString.split(""));
    };

    codeInput.addEventListener("paste", onPaste);
    return () => codeInput.removeEventListener("paste", onPaste);
  }, []);

  useEffect(() => {
    onChange(value.join(""));
  }, [value]);

  return (
    <div
      className="ReactInputVerificationCode__container"
      style={{
        width: `calc(3rem * ${length}+ 1rem* (${length} - 1)`,
        display: "flex",
        position: "relative",
        justifyContent: "space-between"
      }}
    >
      <input
        ref={codeInputRef}
        className="ReactInputVerificationCode__input"
        autoComplete="one-time-code"
        type="text"
        inputMode="decimal"
        onChange={onInputChange}
        onKeyUp={onInputKeyUp}
        onBlur={onInputBlur}
        active={activeIndex}
        style={{
          position: "absolute",
          top: 0,
          opacity: 0,
          left: `calc(${activeIndex} * 3rem + 1rem * ${activeIndex})`,
          width: "3rem",
          height: "3.5rem"
        }}
      />

      {itemsRef.map((ref, i) => (
        <div
          key={i}
          ref={ref}
          role="button"
          tabIndex={0}
          className={`ReactInputVerificationCode__item ${
            i < activeIndex || done ? "is-active" : ""
          } ${i === activeIndex ? "now" : ""}`}
          onFocus={onItemFocus(i)}
          style={{
            width: "3rem",
            height: "3.5rem",
            padding: 0,
            borderRadius: "4px",
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: "3rem",
            textAlign: "center",
            border: 0,
            transition: "box-shadow 0.2s ease-out",
            marginRight: "10px",
            position: "relative"
          }}
        >
          {value[i] || placeholder}
        </div>
      ))}
    </div>
  );
};

export default Version2;

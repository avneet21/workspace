export const UIButton = ({ title, onClickCb }) => {
  return (
    <button className="button" onClick={onClickCb}>
      {title}
    </button>
  );
};

export const Input = ({ InputLabel, type, onChange, value }) => {
  return (
    <div className="input-group">
      <span>{InputLabel}</span>
      <input
        className="input-field"
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

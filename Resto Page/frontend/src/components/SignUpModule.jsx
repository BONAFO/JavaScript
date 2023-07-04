import { useRezise } from "../context/config/resize";

export default function SUModule({ tag, placeholder, type }) {
  const device = useRezise();

  return (
    <div key={`module-${tag}`}>
      <h3 className={`tag-basic tags-${device}`}>{tag.toUpperCase()}</h3>
      <input
      type={type}
        id={`input-${tag}`}
        placeholder={placeholder}
        className={`inp-basic main-input main-input-${device}`}
      />
    </div>
  );
}

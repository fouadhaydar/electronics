import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const EyesComponent = ({
  showPassword,
  handlePssword,
}: {
  showPassword: boolean;
  handlePssword: () => void;
}) => {
  return (
    <div>
      {showPassword ? (
        <EyeFill width={20} height={20} color="gray" onClick={handlePssword} />
      ) : (
        <EyeSlashFill
          width={20}
          height={20}
          color="gray"
          onClick={handlePssword}
        />
      )}
    </div>
  );
};

export default EyesComponent;

import { FormTypes } from "../pages/auth/SignUp";

interface CustomProps {
  setGender: (gender: string) => void; // SetGender should take a string as input
  formData: FormTypes;
}

const GenderBox = ({ setGender, formData }: CustomProps) => {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          name="male"
          checked={formData.gender === "male"} 
          onChange={() => setGender("male")}
          id="male"
        />
        <label htmlFor="male">Male</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="female"
          checked={formData.gender === "female"} 
          onChange={() => setGender("female")}
          id="female"
        />
        <label htmlFor="female">Female</label>
      </div>
    </div>
  );
};

export default GenderBox;

import CustomButton from "~/components/CustomButton";

export default function uikit() {
  return (
    <div>
      <h1>KIT</h1>
      <div className="flex flex-row">
        <CustomButton
          fillColor="#163300"
          borderColor="#163300"
          backgroundColor="white"
          textColor="#163300"
          text="Add to cart"
        />
        <CustomButton
          fillColor="#EDEFEB"
          borderColor="#EDEFEB"
          backgroundColor="white"
          textColor="#EDEFEB"
          text="Add to cart"
        />
      </div>
    </div>
  )
}

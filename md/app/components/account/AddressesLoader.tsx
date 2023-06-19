import AddressLoader from "./AddressLoader";

export default function AddressesLoader() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 gap-4">
        <AddressLoader/>
        <AddressLoader/>
      </div>
    </div>
  )
}

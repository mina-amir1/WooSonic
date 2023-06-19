import { useState } from "react";
import { Site_Title } from "~/config";
import Popup from "~/components/Popup";
import ChangePassword from "~/components/account/ChangePassword";
import ProfileForm from "~/components/account/ProfileForm";
import { useTranslation } from "react-i18next";


export const meta = () => {
  return {
    title: `My Profile | ${Site_Title}`
  }
}

export default function profile() {
  const { t } = useTranslation();
  let [isOpenPassword, setIsOpenPassword] = useState(false)
  function closePassword() {
    setIsOpenPassword(false)
  }
  function openPassword() {
    setIsOpenPassword(true)
  }
  return (
    <div>
      <div className="flex items-center justify-between pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">{t('common.account_info')}</h1>
      </div>
      <ProfileForm />
      <button className="mt-3 font-semibold underline" onClick={openPassword}>{t('common.change_password')}</button>
      {isOpenPassword ? (
        <Popup isOpen={true} closePassword={closePassword}>
          <ChangePassword closePassword={closePassword} />
        </Popup>
      ) : ('')}
    </div>
  )
}

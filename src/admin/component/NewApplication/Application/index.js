import React from 'react'
import UnManagedApplication from './UnManagedApplication'
import ManagedApplication from './ManagedApplication'
import InHouseApplication from './InHouseApplication'
import PrivateSaleApplication from './PrivateSaleApplication'
const Application = ({ tabName }) => {
  const loadView = (tabName) => {
    const views = {
      'unmanaged': <UnManagedApplication />,
      'managed': <ManagedApplication />,
      'private_sale': <PrivateSaleApplication />,
      'in_house': <InHouseApplication />,
      'default': <UnManagedApplication />,
    }
    return views[tabName] || views['default']
  }
  return (
    <>
      {loadView(tabName)}
    </>
  )
}
export default Application
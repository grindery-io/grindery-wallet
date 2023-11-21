export const filterContactsListDataBySearchQuery = (
  item: any,
  search: string
) => {
  return (
    !search ||
    (item.props.userName &&
      item.props.userName.toLowerCase().includes(search.toLowerCase())) ||
    (item.props.userHandle &&
      item.props.userHandle.toLowerCase().includes(search.toLowerCase())) ||
    (item.props.username &&
      item.props.username.toLowerCase().includes(search.toLowerCase())) ||
    (item.props.firstName &&
      item.props.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (item.props.lastName &&
      item.props.lastName.toLowerCase().includes(search.toLowerCase()))
  );
};

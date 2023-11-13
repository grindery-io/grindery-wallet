import { ContactType } from "../components/shared/Contact/Contact";
import { GetContactsResponseType } from "../services/contacts";

export const extractContactsFromContactsResponse = (
  response: GetContactsResponseType
): ContactType[] => {
  return response.map((contact) => ({
    id: contact.id,
    firstName: contact.firstName,
    lastName: contact.lastName,
    username: contact.username,
    phone: contact.phone,
    photo: contact.photo,
    mutual: contact.mutualContact,
    deleted: contact.deleted,
    bot: contact.bot,
    verified: contact.verified,
    premium: contact.premium,
    fake: contact.fake,
    scam: contact.scam,
    grinderyUser: contact.isGrinderyUser,
    invited: contact.isInvited,
    status: contact.status,
  }));
};

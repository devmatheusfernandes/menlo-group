/**
 * Agreement copy shown inside the NDA flow.
 *
 * Modelled on the live Menlo Dental Transitions non-disclosure form: a
 * confidentiality agreement for every confidential listing, plus a HIPAA
 * Business Associate Agreement that only dental opportunities require.
 *
 * This is presentation copy for the prototype — have counsel review the final
 * wording before the form is wired to a real signature service.
 */

export const CONFIDENTIALITY_AGREEMENT: string[] = [
  "In consideration of Menlo Group and its affiliates providing information regarding a business, dental practice or property offered for sale or lease, the undersigned (“Recipient”) agrees that all information received will be treated as Confidential Information.",
  "Recipient will not disclose, publish, copy or in any way reproduce the information without the express written consent of the other party.",
  "The parties will hold Confidential Information confidential, and will not disclose it to any person other than their attorneys, brokers, and accountants. Careless or neglectful handling of this information or material could result in liability for all parties involved.",
  "Recipient will not contact the owner, employees, patients, customers, suppliers or landlord of the business or practice directly. All contact is arranged through Menlo Group.",
  "Each party agrees to indemnify and hold the other harmless against any loss that may be occasioned by a breach, intentional or unintentional, of this Agreement. All parties (including but not limited to Buyer, Seller or any consultant engaged by Seller or Buyer) agree to indemnify Menlo Group, LLC and hold it harmless for any actions related to disclosure or dissemination of information, as well as indemnify Menlo Group from any errors, omissions or misrepresentation associated with information that is provided.",
  "Recipient acknowledges that information provided has been supplied by the owner and has not been independently verified. Recipient is responsible for conducting its own due diligence before entering into any transaction.",
  "If this Agreement becomes the subject of dispute or litigation to resolve a claim or breach or default in performance or dispute in interpretation, the party determined to be in default shall pay the other party’s reasonable attorney’s fees and costs.",
  "This Agreement remains in effect for two years from the date of signature, and is binding on the Recipient’s employees, agents and affiliates.",
];

export const HIPAA_AGREEMENT: string[] = [
  "I agree to maintain the privacy protections and restrict the use and disclosure of all patient information (verbal, written or electronic) obtained from this dental office only for the purposes of serving this dental office.",
  "I understand that I may not sell, barter, give away or reveal any patient information for personal or business gain or any form of marketing or fund raising.",
  "I will contract with any subcontractors to whom I pass this information to hold all patient information confidential and further disclose it only for the purpose for which it was disclosed to them in the service of this dental office.",
  "I will keep current with the industry standards for security, implement and maintain appropriate safeguards to protect this information and document all disclosures of this information with name, address and reason disclosed.",
  "I will report to the dental office any use or disclosure of patient information not provided for by this agreement of which I become aware, including any security incident or breach of unsecured protected health information.",
  "Upon completion of the transaction or termination of discussions, I will return or destroy all patient information received, and retain no copies.",
];

export const SMS_CONSENT =
  "I agree to receive communications by text message about my inquiry. You may opt out by replying STOP or ask for more information by replying HELP. Message frequency varies. Message and data rates may apply.";

export const PRIVACY_NOTE =
  "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent are never shared.";

export const PHONE_TYPES = ["Work", "Mobile", "Home"] as const;

export const FIRST_CONTACT_OPTIONS = [
  "Yes — this is my first inquiry",
  "No — I have spoken with Menlo before",
  "No — I am already working with a Menlo advisor",
] as const;

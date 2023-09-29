import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import { useNavigate } from "react-router";
import Contacts from "../shared/Contacts";
import Button from "../shared/Button";
import useAppContext from "../../hooks/useAppContext";

const ContactsPage = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const {
    state: { contactsLoading, contacts },
    getTgContacts,
  } = useAppContext();

  return (
    <>
      <AppHeader
        onRefresh={
          contacts && contacts.length > 0
            ? () => {
                getTgContacts();
              }
            : undefined
        }
        refreshing={contactsLoading}
      />

      <Contacts
        onContactClick={(contact) => {
          navigate(`/contacts/${contact.id}`);
        }}
        placeholder={
          <div style={{ padding: "12px 16px" }}>
            <div style={{ margin: "32px auto 24px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.8288 2.26936C22.4742 1.46677 23.4483 1 24.4778 1C25.5074 1 26.4815 1.46677 27.1269 2.26936L30.2806 6.19491C31.0065 7.09999 32.1437 7.57209 33.2968 7.44708L38.3028 6.90239C39.3293 6.7883 40.3519 7.14724 41.0823 7.87793C41.8126 8.60863 42.1713 9.63185 42.0573 10.6589L41.5129 15.6676C41.3879 16.8213 41.8598 17.959 42.7644 18.6853L46.6878 21.8408C47.49 22.4865 47.9565 23.4611 47.9565 24.4912C47.9565 25.5213 47.49 26.4959 46.6878 27.1416L42.7519 30.2825C41.8476 31.0099 41.3759 32.1481 41.5004 33.3023L42.0448 38.311C42.1596 39.3382 41.8011 40.3619 41.0706 41.0928C40.3401 41.8237 39.3169 42.1824 38.2903 42.0675L33.2842 41.5228C32.1311 41.3974 30.9938 41.8696 30.2681 42.775L27.1269 46.6859C26.4819 47.4892 25.5077 47.9565 24.4778 47.9565C23.448 47.9565 22.4738 47.4892 21.8288 46.6859L18.6771 42.7625C17.9503 41.8574 16.8126 41.3853 15.6589 41.5103L10.6529 42.055C9.62603 42.1707 8.60236 41.8123 7.87165 41.0812C7.14094 40.3501 6.78273 39.3259 6.8984 38.2985L7.4428 33.2898C7.56769 32.1355 7.09592 30.9971 6.1913 30.27L2.26993 27.1166C1.46705 26.4713 1 25.4965 1 24.4662C1 23.4358 1.46705 22.461 2.26993 21.8157L6.1913 18.6603C7.09622 17.9342 7.56814 16.7963 7.4428 15.6425L6.8984 10.6339C6.78355 9.60662 7.14203 8.5829 7.87254 7.852C8.60305 7.12111 9.62622 6.76243 10.6529 6.87735L15.6589 7.42204C16.8125 7.54659 17.9501 7.07464 18.6771 6.16987L21.8288 2.26936Z"
                  fill="#2AABEE"
                  stroke="#2AABEE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.2795 13.5756L20.8298 24.9249C20.8127 24.9816 20.8583 25.0367 20.914 25.0245L23.1657 24.5066C23.217 24.4943 23.2627 24.5434 23.2513 24.5985L21.0109 35.341C20.9938 35.4238 21.0965 35.4713 21.1407 35.4008L30.152 21.0943C30.1891 21.0361 30.1392 20.9595 30.075 20.9763L26.7879 21.8527C26.7294 21.8681 26.6795 21.8037 26.7052 21.7455L30.2105 13.6323C30.2333 13.5817 30.1976 13.522 30.1449 13.522H24.3479C24.3165 13.522 24.2894 13.5434 24.2795 13.5756Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                lineHeight: "1.45",
                margin: "0 0 24px",
              }}
            >
              Your crypto wallet with social super powers!
            </p>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              sx={{
                padding: "10px 20px !important",
                fontSize: "14px",
                width: "100%",
              }}
              disabled={connecting}
              onClick={() => {
                setConnecting(true);
                if (window.Telegram?.WebApp?.openLink) {
                  window.Telegram.WebApp.openLink(
                    `https://wallet-staging.grindery.io/connect/telegram?${
                      window.Telegram?.WebApp?.initData || ""
                    }`
                  );
                } else {
                  window.open(
                    `https://wallet-staging.grindery.io/connect/telegram?${
                      window.Telegram?.WebApp?.initData || ""
                    }`
                  );
                }
              }}
              value="Grant Access"
            />
            <ul
              style={{
                margin: "24px 0 0",
                padding: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
                gap: "12px",
              }}
            >
              {[
                "Forget about wallet addresses of your contacts",
                "Send tokens before they setup they own wallet",
                "Earn rewards by identifying contacts to refer",
                "Explore your crypto network",
                "and more to come…",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    margin: "0 20px",
                    padding: "4px 0",
                    fontSize: "14px",
                    fontWeight: 300,
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: "12px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1946_7151)">
                      <path
                        d="M9 0C7.21997 0 5.47991 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389957 7.20038 -0.17433 9.00998 0.172937 10.7558C0.520204 12.5016 1.37737 14.1053 2.63604 15.364C3.89472 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C17.9974 6.61384 17.0484 4.32616 15.3611 2.63889C13.6738 0.951621 11.3862 0.00258081 9 0V0ZM9 16.5C7.51664 16.5 6.0666 16.0601 4.83323 15.236C3.59986 14.4119 2.63856 13.2406 2.07091 11.8701C1.50325 10.4997 1.35473 8.99168 1.64411 7.53682C1.9335 6.08197 2.64781 4.74559 3.6967 3.6967C4.7456 2.64781 6.08197 1.9335 7.53683 1.64411C8.99168 1.35472 10.4997 1.50325 11.8701 2.0709C13.2406 2.63856 14.4119 3.59985 15.236 4.83322C16.0601 6.06659 16.5 7.51664 16.5 9C16.4978 10.9885 15.7069 12.8948 14.3009 14.3009C12.8948 15.7069 10.9885 16.4978 9 16.5Z"
                        fill="#0B0C0E"
                      />
                      <path
                        d="M7.43901 11.5676L5.03009 9.15868C4.88944 9.01808 4.69871 8.93909 4.49984 8.93909C4.30097 8.93909 4.11024 9.01808 3.96959 9.15868C3.82899 9.29933 3.75 9.49006 3.75 9.68893C3.75 9.8878 3.82899 10.0785 3.96959 10.2192L6.37851 12.6281C6.51781 12.7675 6.68319 12.878 6.86522 12.9534C7.04725 13.0288 7.24235 13.0677 7.43938 13.0677C7.63642 13.0677 7.83152 13.0288 8.01355 12.9534C8.19558 12.878 8.36096 12.7675 8.50026 12.6281L13.8483 7.28009C13.9889 7.13944 14.0679 6.94871 14.0679 6.74984C14.0679 6.55097 13.9889 6.36024 13.8483 6.21959C13.7076 6.07899 13.5169 6 13.318 6C13.1191 6 12.9284 6.07899 12.7878 6.21959L7.43901 11.5676Z"
                        fill="#0B0C0E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1946_7151">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;

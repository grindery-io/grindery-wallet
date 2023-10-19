import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { useNavigate } from "react-router";
import BulletPoints from "../shared/BulletPoints";
import Title from "../shared/Title";
import { Box, Button } from "@mui/material";
import ContactsList from "../shared/ContactsList/ContactsList";

const ContactsPage = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  return (
    <>
      <ContactsList
        onContactClick={(contact) => {
          navigate(`/contacts/${contact.id}`);
        }}
        placeholder={
          <Box sx={{ padding: "12px 16px 50px" }}>
            <Box sx={{ margin: "32px auto 24px" }}>
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
            </Box>
            <Title>Your crypto wallet with social super powers!</Title>
            <Button
              fullWidth
              disabled={connecting}
              onClick={() => {
                setConnecting(true);
                setTimeout(() => {
                  if (window.Telegram?.WebApp?.openLink) {
                    window.Telegram.WebApp.openLink(
                      `${
                        window.location.protocol + "//" + window.location.host
                      }/connect/telegram?${
                        window.Telegram?.WebApp?.initData || ""
                      }`
                    );
                  } else {
                    window.open(
                      `${
                        window.location.protocol + "//" + window.location.host
                      }/connect/telegram?${
                        window.Telegram?.WebApp?.initData || ""
                      }`
                    );
                  }
                }, 500);
              }}
            >
              Grant Access
            </Button>
            <BulletPoints
              style={{
                marginTop: "24px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "inline-flex",
              }}
              items={[
                "Forget about wallet addresses of your contacts",
                "Send tokens before they setup they own wallet",
                "Earn rewards by identifying contacts to refer",
                "Explore your crypto network",
                "and more to come…",
              ]}
            />
          </Box>
        }
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;

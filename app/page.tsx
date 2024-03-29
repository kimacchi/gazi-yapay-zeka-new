import Image from "next/image";
import { Inter } from "next/font/google";
import { Test } from "@/components/test";
import axios from "axios";
import SocialsCard from "@/components/SocialsCard";
import { Metadata } from "next";
import Celebration from "@/components/Celebration";
import PocketBase from "pocketbase";
import { Event } from "@/types/event";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

const inter = Inter({ subsets: ["latin"] });

const links: {
  svg: React.ReactNode;
  title: string;
  subtitle: string;
  url: string;
}[] = [
  {
    title: "Whatsapp",
    subtitle: "Whatsapp grubumuza katılarak hiçbir duyuruyu kaçırmayın!",
    url: "https://chat.whatsapp.com/EfwMxug2AkEIXGQrNpC1m7",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-whatsapp"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      </>
    ),
  },
  {
    title: "Instagram",
    subtitle:
      "Bizi Instagram'dan takip edin ve en güncel gönderilerimizden haberdar olun!",
    url: "https://www.instagram.com/gaziyapayzeka/",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-instagram"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
        </svg>
      </>
    ),
  },
  {
    title: "Discord",
    subtitle: "Discord sunucumuza katılın ve bizlerle sohbet edin!",
    url: "https://discord.gg/QuVgreqvs5",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-discord"
          viewBox="0 0 16 16"
        >
          <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
        </svg>
      </>
    ),
  },
  {
    title: "LinkedIn",
    subtitle:
      "LinkedIn'imizi takip edin ve sektördeki gelişmelerden haberdar olun!",
    url: "https://www.linkedin.com/company/gaziyapayzeka/",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-linkedin"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      </>
    ),
  },
  {
    title: "Youtube",
    subtitle:
      "Youtube sayfamızı takip ederek en eğlenceli ve bilgilendirici videolara ulaşın!",
    url: "https://www.youtube.com/channel/UCpxJfBA_FnleFeA0WYvereA",
    svg: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-youtube"
          viewBox="0 0 16 16"
        >
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
        </svg>
      </>
    ),
  },
];

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Gazi Yapay Zeka",
  description: "Gazi Üniversitesi Yapay Zeka Topluluğu'nun Websitesi",
  keywords:
    "gazi üniversitesi,gazi üniversitesi mühendislik fakültesi,gazi üniversitesi topluluk,yapay zeka,yapay zeka topluluğu,gazi üniversitesi yapay zeka,gazi üniversitesi yapay zeka topluluğu,gazi yapay zeka,gazi yapay zeka topluluğu,gazi ai,gazi ai topluluğu,gazi artificial intelligence,gazi artificial intelligence topluluğu,gazi artificial intelligence society,yapay zekâ,gazi üniversitesi,gazi,gazi üni,topluluk,makine öğrenmesi,yapay zeka ve makine öğrenmesi,gazi yapay zeka yönetim sistemi,gazi yapay zeka login,yapay zeka login,yapay zeka haberleri,yapay zeka yönetim sistemi",
  robots: "index, follow",
};

export default async function Home() {
  const temp = new Date().toLocaleString("en-US", { timeZone: "Asia/Almaty" });
  const now = new Date(temp);
  const stringNow = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(
    2,
    "0"
  )}:${now.getSeconds()}`;

  const events_ = await pb.collection("events").getList(1, 5, {
    filter: `(releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (eventTime >= "${stringNow}") && (exclusiveForActiveMembers = false) && (exclusiveForBoard = false)`,
    sort: "+eventTime",
  });
  const temp_events = events_.items as unknown;
  const events = temp_events as Event[];
  console.log(events);

  return (
    <main className="w-full min-h-screen scroll-smooth">
      <div className="absolute w-full h-full">
        <Celebration />
      </div>
      <div className="relative z-20 w-full min-h-screen flex flex-col sm:px-32 px-4 sm:pb-32 pb-12 ">
        <div className=" flex items-center w-full justify-between sm:flex-row flex-col">
          <section className="md:w-2/5 sm:3/5 w-full min-h-screen flex flex-col sm:gap-4 gap-16 sm:py-32 py-12 md:text-base text-lg">
            <h1 className="text-4xl font-bold">
              Gazi Yapay Zeka Sitesi Beta Aşamasında!
            </h1>
            <p>
              Aramıza tekrardan hoş geldin! Sitemizin yönetim sistemini artık
              kullanabilirsin! Tek yapman gereken{" "}
              <a href="/login" className="underline text-blue-400">
                buraya
              </a>{" "}
              tıklayarak giriş yapmak.
            </p>
            <p>
              Güncellemeleri takipte kalmayı ve etkinliklerimize siteye giriş
              yaptıktan sonra kaydolmayı sakın unutma!
            </p>
            <div className="flex gap-4">
              <a
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Giriş Yap
              </a>
              <a
                href="#etkinlikler"
                className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-md"
              >
                Etkinliklerimizi incele
              </a>
            </div>
          </section>
            <a
              href={"https://forms.gle/NK7uovbsJkm32Xme7"}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-start justify-center gap-2 sm:w-1/3 w-4/5 border-orange-500 border-4 rounded-xl p-4 transition-all hover:bg-orange-500 hover:rounded-3xl"
            >
              <div className="flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-shield-plus"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
                <h2 className="text-lg font-medium">
                  İdari Kurul Üye Alımları
                </h2>
              </div>
              <p className="text-xs text-neutral-400 text-left group-hover:text-white">
                Siz de bizimle birlikte çalışmak ister misiniz? Hemen başvurun, sizi de aramızda görelim!
              </p>
            </a>
        </div>
        <section
          id="etkinlikler"
          className="w-full flex flex-col items-center gap-4"
        >
          <h2 className="text-2xl font-bold mb-12 text-center">
            Yakındaki etkinliklerimiz
          </h2>
          {events.length > 0 ? (
            <>
              {events.map((item) => (
                <Link
                  href={`/login`}
                  key={item.id}
                  className="sm:w-2/5 w-11/12 h-20 p-2 flex flex-col justify-between rounded-md bg-zinc-600/30 hover:bg-zinc-500/30"
                >
                  <div className="flex justify-between">
                    <h2>{item.name}</h2>
                    <h2>
                      {item.participants.length}/{item.maxParticipant}
                    </h2>
                  </div>
                  <h2>{new Date(item.eventTime).toLocaleDateString()}</h2>
                </Link>
              ))}
            </>
          ) : (
            <p className="sm:w-1/2 text-center w-full">
              Ne yazık ki yakında bir etkinliğimiz yoktur. Ancak bu her an
              değişebilir! Güncellemeleri takip edin!
            </p>
          )}
        </section>
        <section className="mt-32 flex flex-col items-center gap-4 ml-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Sosyal medya hesaplarımız
          </h2>
          {/* <div className="w-full flex flex-wrap justify-center gap-4"> */}
          <SocialsCard links={links} />
          {/* </div> */}
        </section>
      </div>
    </main>
  );
}

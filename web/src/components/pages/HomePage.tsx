import { FiLoader } from "react-icons/fi";
import { useLang } from "../../hooks/Language.hooks.ts";
import { ButtonCard } from "../lib/Cards/ButtonCard.tsx";
import { Carousel } from "../lib/Layout/Carousel.tsx";

export default function HomePage() {
    const lang = useLang();

    const isLoading = false; // This should be replaced with actual loading state logic

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12">
            <div className="text-text-primary hover:text-accent transition-colors duration-300">
                <h1 className="text-2xl font-bold mb-4">
                    {lang("HOMEPAGE_RECENTLY_WATCHED")}
                </h1>


                <div className="overflow-hidden">
                    <Carousel>
                        <ButtonCard
                            title="Overlord"
                            description="Im Jahr 2126 startete das DMMORPG (Dive Massively Multiplayer Online Role Playing Game) Yggdrasil, das durch die ungewöhnlich vielen Möglichkeiten, mit dem Spiel zu interagieren, heraussticht. Nach 12 Jahren Laufzeit sollen die Server jedoch abgeschaltet werden. Im Spiel existiert die Gilde Ainz Ooal Gown, die sich die stärkste Gilde des Spiels nennt. Jedoch haben die meisten Spieler der Gilde aufgrund ihres Lebens in der wirklichen Welt mit Yggdrasil aufgehört. Momonga, Gildenmeister von Ainz Ooal Gown, verbleibt daher alleine in der Gilde, bis die Server abgeschaltet werden. Als es zur Abschaltung der Server kommt, bemerkt er, dass er normale Spielerfunktionen wie das Schreiben von Nachrichten oder das Ausloggen nicht benutzen kann. Nachdem sogar die NPCs anfangen mit ihm zu reden und eine Persönlichkeit besitzen, entscheidet er, das Spiel ernst zu nehmen und andere Spieler aus der realen Welt in dieser neuen Welt zu suchen. Unter dem Namen Ainz Ooal Gown beginnt er die Erforschung dieser neuen Welt und versucht herauszufinden, was wirklich passiert ist."
                            image="https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABUjwCZvrDQd9qCaX_M1eyQrU-EOtZYMDYrPt0nLFrOVgun97zC92OqbJz5MLogK0eJeUCKAX0qBzZWg9vXTDc9HhZdefDlOLvE5O.jpg?r=dd2"
                            showIcon={false}
                            subText="Season 4, Episode 3"
                        />
                        <ButtonCard
                            title="Wise Man's Grandchild"
                            description="Ein junger namenloser Geschäftsmann wird nach seinem Tod in einer anderen Welt wiedergeboren. Der Held Merlin Wolford tauft ihn auf den Namen Shin und erzieht ihn ebenfalls zu einem Helden. So erlernt Shin bereits in jungen Jahren durch den Unterricht Wolfords übermenschliche Kräfte, wohingegen Unterricht in Sachen gesunder Menschenverstand zu kurz gekommen ist. Als Shin 15 Jahre alt ist, wird er auf Rat des Königs von Earlshide an einer Magie-Akademie eingeschrieben. Dies ist einer Abmachung zwischen Merlin und dem König geschuldet: Dieser besagt, dass Shin nicht für die politische Kriegsführung missbraucht wird. In der Hauptstadt des Königreiches angekommen, rettet er zwei Mädchen vor Räubern, schreibt sich an der Magie-Akademie ein und gründet dort einen Schulclub."
                            image="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/246dc55d21b1b20158f04247511feecc.jpg"
                            showIcon={false}
                            subText="Season 1, Episode 8"
                        />
                        <ButtonCard
                            title="That Time I Got Reincarnated as a Slime"
                            description="Satoru Mikami ist ein gewöhnlicher Büroangestellter, der bei einem Angriff auf der Straße stirbt – nur um in einer anderen Welt als Schleim-Monster wiedergeboren zu werden. Mit neuen Kräften und dem Namen Rimuru Tempest beginnt er, eine Gesellschaft zu gründen, in der alle Rassen friedlich koexistieren können. Doch mächtige Feinde und politische Intrigen stehen ihm im Weg."
                            image="https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_ThatTimeIGotReincarnatedAsASlimeIsekaiChronicles.jpg"
                            showIcon={false}
                            subText="Season 2, Episode 12"
                        />

                        <ButtonCard
                            title="The Rising of the Shield Hero"
                            description="Naofumi Iwatani wird in eine Parallelwelt beschworen, um einer der vier legendären Helden zu werden – der Schildheld. Doch er wird verraten, seiner Ehre beraubt und steht plötzlich ganz alleine da. Nur mit seinem Schild ausgerüstet kämpft er nun darum, stärker zu werden und seinen Namen reinzuwaschen."
                            image="https://a.storyblok.com/f/178900/1920x1080/127d3c6460/shield-hero-season-4.jpg/m/1200x0/filters:quality(95)format(webp)"
                            showIcon={false}
                            subText="Season 1, Episode 21"
                        />

                        <ButtonCard
                            title="Re:Zero – Starting Life in Another World"
                            description="Subaru Natsuki wird plötzlich in eine Fantasy-Welt transportiert, doch statt übermächtiger Fähigkeiten besitzt er nur eine: Er kann nach dem Tod an einem bestimmten Punkt im Leben neu anfangen. Diese Fähigkeit – verbunden mit dem Schmerz jedes Todes – zwingt ihn, sich immer wieder für das Richtige zu entscheiden."
                            image="https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_ReZeroStartingLifeInAnotherWorldTheProphecyOfTheThrone_image1600w.jpg"
                            showIcon={false}
                            subText="Season 2, Episode 6"
                        />

                    </Carousel>
                </div>
            </div>
        </div>
    )
}

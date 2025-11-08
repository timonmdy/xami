import clsx from "clsx";
import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { useLang } from "../../../hooks/Language.hooks";
import { getContentDetails } from "../../../service/Content.service";
import { Episode } from "../../../types/Content.types";
import Badge from "../../custom/Detail/Badge";
import DetailRow from "../../custom/Detail/DetailRow";
import StarRating from "../../custom/Detail/Rating/StarRating";
import ActionButton from "../../lib/Buttons/Action.Button";
import TitledSection from "../../lib/Layout/TitledSection";

const placeholderPoster =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 900'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop stop-color='#888' offset='0'/>
          <stop stop-color='#555' offset='1'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#ddd' font-size='32' font-family='system-ui'>Poster</text>
    </svg>
  `);

export default function ContentDetailPage() {
    const { contentId } = useParams<{ contentId: string }>();
    console.log(contentId)
    const t = useLang();

    const { data, isLoading, isError, refetch } = useQuery(
        ["content", contentId],
        () => getContentDetails(contentId ?? ""),
        { enabled: Boolean(contentId) }
    );

    const [descExpanded, setDescExpanded] = useState(false);

    const { seasons, episodes } = useMemo(() => {
        const eps: Episode[] = data?.episodes ?? [];
        const grouped = eps.reduce((acc, ep) => {
            const s = ep.season ?? 1;
            if (!acc[s]) acc[s] = [];
            acc[s].push(ep);
            return acc;
        }, {} as Record<number, Episode[]>);

        const seasonList = Object.entries(grouped)
            .map(([s, eps]) => [Number(s), eps] as [number, Episode[]])
            .sort((a, b) => a[0] - b[0]);

        return { seasons: seasonList, episodes: eps };
    }, [data]);

    const [activeSeason, setActiveSeason] = useState<number>(
        seasons?.[seasons.length - 1]?.[0] ?? 1
    );

    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
                <div className="flex flex-col items-center gap-4">
                    <ClipLoader size={48} />
                    <div className="text-sm text-text-secondary">Loading content…</div>
                </div>
            </div>
        );

    if (!data || isError)
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-text-primary px-4">
                <div className="max-w-md rounded-2xl border border-borders bg-cards p-6 text-center shadow">
                    <div className="text-lg font-semibold mb-2">Couldn't load content</div>
                    <div className="text-sm text-text-secondary mb-4">
                        There was a problem fetching the content details.
                    </div>
                    <div className="flex justify-center gap-3">
                        <ActionButton onClick={() => refetch()}>Retry</ActionButton>
                        <ActionButton variant="ghost">
                            {t("ERROR_PAGE_NOT_FOUND")}
                        </ActionButton>
                    </div>
                </div>
            </div>
        );

    const heroPoster = data.poster || placeholderPoster;
    const rating = data.userRating ?? 0;

    return (
        <div className="min-h-screen w-full bg-background text-text-primary">
            <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="relative grid gap-6 py-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10 lg:gap-14">
                    <div className="group relative overflow-hidden rounded-2xl border border-borders bg-cards shadow-sm">
                        <img
                            src={heroPoster}
                            alt={`${data.title} poster`}
                            className="aspect-[2/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="eager"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                                {data.title}
                            </h1>
                            {data.subtitle && (
                                <p className="text-sm md:text-base text-text-secondary">
                                    {data.subtitle}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <ActionButton onClick={console.log}>▶ Start</ActionButton>
                            <ActionButton variant="ghost" onClick={console.log}>
                                {data.actions?.isSaved ? "✓ Saved" : "＋ Save"}
                            </ActionButton>
                            <ActionButton variant="ghost" onClick={console.log}>
                                {data.actions?.isSubscribed
                                    ? "✓ Subscribed"
                                    : "★ Subscribe"}
                            </ActionButton>

                            <div className="h-6 w-px bg-borders/70" />

                            <StarRating value={rating} onChange={console.log} />
                        </div>

                        {!!data.description && (
                            <div className="relative">
                                <p
                                    className={clsx(
                                        "text-sm md:text-base leading-relaxed text-text-secondary transition-all",
                                        !descExpanded && "line-clamp-4"
                                    )}
                                >
                                    {data.description}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setDescExpanded((s) => !s)}
                                    className="mt-2 text-sm text-accent hover:underline"
                                >
                                    {descExpanded ? "Show less" : "Read more"}
                                </button>
                            </div>
                        )}

                        <div className="mt-2 overflow-hidden rounded-2xl border border-borders bg-cards">
                            <div className="border-b border-borders px-4 py-3 text-sm font-medium text-text-secondary">
                                Details
                            </div>
                            <div className="px-4 py-2">
                                {data.details.length === 0 ? (
                                    <p className="text-sm text-text-secondary">
                                        No details available
                                    </p>
                                ) : (
                                    <table className="w-full border-separate border-spacing-y-0">
                                        <tbody>
                                            {data.details?.map((d, i) => (
                                                <DetailRow
                                                    key={i}
                                                    label={d.label}
                                                    value={d.value}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {(data.externalLinks ?? []).map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-borders bg-cards px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-background"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="my-6 h-px w-full bg-borders/70" />
            </div>

            <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 pb-10 md:pb-16">
                <div className="grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <TitledSection title="Episodes">
                            {seasons.length > 1 && (
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {seasons.map(([s]) => (
                                        <button
                                            key={s}
                                            onClick={() => setActiveSeason(s)}
                                            className={clsx(
                                                "rounded-xl border px-3 py-1 text-xs font-medium transition-colors",
                                                activeSeason === s
                                                    ? "border-accent bg-accent/10 text-accent"
                                                    : "border-borders bg-cards text-text-secondary hover:bg-background"
                                            )}
                                        >
                                            Season {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <ul className="divide-y divide-borders/70 overflow-hidden rounded-2xl border border-borders">
                                {(
                                    seasons.find(([s]) => s === activeSeason)?.[1] ??
                                    episodes
                                ).map((ep) => (
                                    <li
                                        key={ep.id}
                                        className="grid grid-cols-[auto_1fr_auto] gap-4 bg-cards px-3 py-3 sm:px-4"
                                    >
                                        <div className="flex items-center justify-center text-sm text-text-secondary w-8">
                                            {ep.number}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="truncate text-sm font-medium text-text-primary">
                                                    {ep.title}
                                                </span>
                                                {ep.duration && (
                                                    <Badge>{ep.duration}</Badge>
                                                )}
                                                {typeof ep.progress ===
                                                    "number" && (
                                                    <div className="ml-auto w-full max-w-[200px]">
                                                        <div className="h-1.5 w-full rounded-full bg-borders">
                                                            <div
                                                                className="h-1.5 rounded-full bg-accent"
                                                                style={{
                                                                    width: `${Math.round(
                                                                        ep.progress *
                                                                            100
                                                                    )}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {ep.description && (
                                                <p className="mt-1 line-clamp-2 text-xs text-text-muted">
                                                    {ep.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <ActionButton className="whitespace-nowrap">
                                                Play
                                            </ActionButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </TitledSection>
                    </div>

                    {data.related && (
                        <div className="space-y-6">
                            <TitledSection title="Related Content">
                                <div className="relative">
                                    <div className="-mx-3 flex gap-4 overflow-x-auto px-3 pb-2 scrollbar-thin scrollbar-thumb-borders/70">
                                        {data.related.map((r) => (
                                            <a
                                                key={r.id}
                                                href="#"
                                                className="group w-40 shrink-0"
                                            >
                                                <div className="overflow-hidden rounded-xl border border-borders bg-cards">
                                                    <div className="aspect-[2/3] w-full overflow-hidden">
                                                        <img
                                                            src={
                                                                r.poster ||
                                                                placeholderPoster
                                                            }
                                                            alt={r.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="p-2">
                                                        <div className="truncate text-xs font-medium text-text-primary">
                                                            {r.title}
                                                        </div>
                                                        {r.subtitle && (
                                                            <div className="truncate text-[11px] text-text-secondary">
                                                                {r.subtitle}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </TitledSection>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-8" />
        </div>
    );
}

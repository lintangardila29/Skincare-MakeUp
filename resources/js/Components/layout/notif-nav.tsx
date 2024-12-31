import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { BellIcon } from "lucide-react";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useRef } from "react";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";

const NotifNav = ({ auth }: PageProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const hasNotifications = auth.notifications.length > 0;
    if (hasNotifications) {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }
    return (
        <>
            <audio hidden ref={audioRef} src="/sounds/ping.mp3" />
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                        <BellIcon className="w-6 h-6" />
                        <span className={`absolute flex h-3 w-3 top-1 right-1 ${hasNotifications ? "opacity-100" : "opacity-0"}`}>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent align="start" side="bottom" className="min-h-24 min-w-[360px] max-w-screen-sm md:min-w-[420px] p-0">
                    {!hasNotifications ? (
                        <div className="flex items-center justify-center gap-1 p-2 rounded-md h-24">
                            <Label className="text-lg">🎉 No new notifications.</Label>
                        </div>
                    ) :
                        <>
                            <ScrollArea className="h-[70vh] p-2">
                                {auth.notifications?.map((notification) => (
                                    <div key={notification.id} className="flex flex-col gap-1 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer p-2 rounded-md">
                                        <Link href={notification.data.url}>
                                            <Label className="text-lg hover:cursor-pointer">
                                                {notification.data.title}
                                            </Label>
                                            <div className="flex-1">
                                                <p className="text-sm text-muted-foreground">
                                                    {notification.data.message}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </ScrollArea>
                            <div className="w-full flex p-2 justify-start">
                                <Button onClick={() => router.post('/mark-all-as-read')} variant="ghost" size="sm" className="text-sm font-semibold">
                                    Mark all as read
                                </Button>
                            </div>
                        </>
                    }
                </HoverCardContent>
            </HoverCard>
        </>
    )
}

export default NotifNav

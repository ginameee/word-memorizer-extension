import ChatContent from "@/components/ChatContent";
import SummaryContent from "@/components/SummaryContent";
import TranscriptContent from "@/components/TranscriptContent";
import CaptionIcon from "@/components/icons/CaptionIcon";
import NoteIcon from "@/components/icons/NoteIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import SettingIcon from "@/components/icons/SettingIcon";
import SettingContent from "@/components/SettingContent";

export const TABS: {
  name: string;
  label: string;
  contentComponent?: React.ReactNode;
  icon: React.ReactNode;
}[] = [
  {
    name: "words",
    label: "Words",
    icon: <NoteIcon size={18} />,
    contentComponent: <SummaryContent />,
  },
  {
    name: "transcript",
    label: "Transcript",
    icon: <CaptionIcon size={18} />,
    contentComponent: <TranscriptContent />,
  },
  {
    name: "setting",
    label: "Setting",
    icon: <SettingIcon size={18} />,
    contentComponent: <SettingContent />,
  },
];

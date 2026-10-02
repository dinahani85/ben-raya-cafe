import { site, type SocialId } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { ExternalLink } from './ExternalLink';
import { FacebookIcon, InstagramIcon, MapPinIcon, TikTokIcon } from './Icons';

const icons: Record<SocialId, (p: { size?: number }) => JSX.Element> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  facebook: FacebookIcon,
  location: MapPinIcon,
};

export function Socials({ showLabels = false, className = '' }: { showLabels?: boolean; className?: string }) {
  const { l } = useLanguage();
  return (
    <ul className={`socials ${className}`}>
      {site.socials.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <ExternalLink href={s.url} className="socials__link" label={showLabels ? undefined : l(s.label)}>
              <span className="socials__icon">
                <Icon size={24} />
              </span>
              {showLabels && <span className="socials__label">{l(s.label)}</span>}
            </ExternalLink>
          </li>
        );
      })}
    </ul>
  );
}

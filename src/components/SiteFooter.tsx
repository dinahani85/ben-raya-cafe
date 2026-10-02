import { forwardRef } from 'react';
import { site } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { Logo, Tagline } from './Brand';
import { ExternalLink } from './ExternalLink';
import { ClockIcon, PhoneIcon, PinIcon } from './Icons';
import { LeafDivider, Sprig } from './Ornaments';
import { Socials } from './Socials';
import { WhatsAppButton } from './WhatsAppButton';

export const SiteFooter = forwardRef<HTMLElement>(function SiteFooter(_, ref) {
  const { t, l } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer ref={ref} className="site-footer">
      <div className="site-footer__bg" style={{ backgroundImage: `url(${site.footerImage})` }} aria-hidden="true" />
      <Sprig className="site-footer__sprig site-footer__sprig--a" />

      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo variant="light" className="site-footer__logo" />
          <Tagline className="tagline--light" />
        </div>

        <div className="site-footer__follow">
          <h2 className="site-footer__title">{t('followUs')}</h2>
          <p className="site-footer__sub">{t('followSub')}</p>
          <Socials showLabels className="socials--footer" />
          <LeafDivider className="site-footer__divider" />
          <WhatsAppButton variant="outline" />
          <p className="site-footer__enjoy">{t('enjoy')}</p>
        </div>

        <div className="site-footer__info">
          <ExternalLink href={site.location.mapsUrl} className="site-footer__loc">
            <PinIcon size={18} />
            <span>{site.location.address ? l(site.location.address) : l(site.location.label)}</span>
          </ExternalLink>
          <ExternalLink href={site.phone.tel} className="site-footer__loc" label={`${t('callUs')} ${site.phone.display}`}>
            <PhoneIcon size={18} />
            <bdi dir="ltr">{site.phone.display}</bdi>
          </ExternalLink>
          {site.hours.length > 0 && (
            <div className="site-footer__hours">
              <ClockIcon size={18} />
              <dl>
                <span className="sr-only">{t('hours')}</span>
                {site.hours.map((h) => (
                  <div key={h.days.en}>
                    <dt>{l(h.days)}</dt>
                    <dd dir="ltr">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <p className="site-footer__legal">
            © {year} {l(site.name)}. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
});

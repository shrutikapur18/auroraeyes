import { Link } from "react-router-dom";

interface InternalLinksProps {
  title?: string;
  links: { to: string; label: string }[];
}

const InternalLinks = ({ title = "Related Pages", links }: InternalLinksProps) => {
  if (!links.length) return null;
  return (
    <nav aria-label="Related content" className="reading-panel rounded-xl p-5 mt-6">
      <h3 className="font-heading text-sm text-primary mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default InternalLinks;

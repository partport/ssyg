import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="d-flex justify-content-center py-3 text-bg-dark">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link active" aria-current="page">
              Home
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/groups">
            <a className="nav-link">Groups</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;

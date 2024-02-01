import Link from "next/link"

export default function MainMenuButton() {

  return (
    <Link href="/" className="hover:underline">
      &#x3c; Return to Main Menu
    </Link>
  );
}

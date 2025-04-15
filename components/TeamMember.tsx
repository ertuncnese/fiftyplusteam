import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

interface Props {
  name: string;
  title: string;
  image: string;
  linkedin: string;
  email: string;
  phone: string;
  about: string[];
}

export default function TeamMember({
  name,
  title,
  image,
  linkedin,
  email,
  phone,
  about,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline flex items-center gap-1 text-sm mt-1"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </div>
      {about.map((text, idx) => (
        <p key={idx} className="text-sm leading-relaxed mb-2">
          {text}
        </p>
      ))}
      <p className="text-sm font-semibold mt-4 text-fuchsia-900">
        ✉️ {email}
        <br />
        📞 {phone}
      </p>
    </div>
  );
}

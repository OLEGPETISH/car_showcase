"use client";

import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      {/* Верхняя часть футера с логотипом и ссылками */}
      <div className="flex flex-col max-md:flex-col md:flex-row flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        {/* Логотип и описание */}
        <div className="flex flex-col justify-start items-start gap-6">
          <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700">
            Car Hub 2023 <br /> All rights reserved &copy;
          </p>
        </div>

        {/* Ссылки футера */}
        <div className="flex flex-wrap gap-10">
          {footerLinks.map((link) => (
            <div key={link.title} className="flex flex-col gap-3">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} href={item.url} className="text-gray-500 hover:text-gray-700 transition">
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Нижняя часть футера с копирайтом и ссылками */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t border-gray-100 w-full sm:px-16 px-6 py-6">
        <p className="text-gray-500 text-left sm:ml-0 ml-0">
          @2023 CarHub. All Rights Reserved
        </p>
        <div className="flex gap-5 mt-3 sm:mt-0">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

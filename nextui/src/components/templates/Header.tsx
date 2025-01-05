"use client"

import { siteConfig } from "@/config/site"
import { Select, SelectItem } from "@nextui-org/select"

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1>{siteConfig.name}</h1>
          <Select className="max-w-xs" label="Favorite Animal" placeholder="Select an animal">
            {[
              { label: "Cat - 猫", value: "cat" },
              { label: "Dog - 犬", value: "dog" },
            ].map((animal) => (
              <SelectItem key={animal.value} value={animal.value} children={animal.label} />
            ))}
          </Select>
        </div>
      </div>
    </header>
  )
}

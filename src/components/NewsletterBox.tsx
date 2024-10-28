"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export default function NewsletterOptin() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour envoyer l'email à votre service de newsletter
    console.log("Email soumis:", email)
    toast({
      title: "Inscription réussie !",
      description: "Merci de vous être inscrit à notre newsletter.",
    })
    setEmail("")
  }

  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="container mx-auto max-w-screen-lg px-4 py-8 lg:py-6 flex justify-center items-center">
        <div className="w-full max-w-xl text-center">
          {/* <h2 className="mb-4 text-xl font-medium tracking-tight">
            Restez informé
          </h2> */}
          <p className="mb-6 text-sm text-gray-600  dark:text-gray-400">
            Inscrivez-vous à notre newsletter pour recevoir nos articles par mail.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 w-full max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Button type="submit" className="w-full sm:w-auto">
              S&apos;inscrire
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

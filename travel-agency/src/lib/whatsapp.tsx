const WHATSAPP_NUMBER = "919541790727"

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  window.open(url, "_blank", "noopener,noreferrer")
}

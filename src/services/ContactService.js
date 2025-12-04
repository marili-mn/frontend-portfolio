export const contactConfig = {
  email: "nahuemarcilli@gmail.com"
};

export const ContactService = {
  getEmail() {
    return contactConfig.email;
  },

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(contactConfig.email);
      return true;
    } catch (err) {
      console.error('Failed to copy email:', err);
      return false;
    }
  },

  getMailtoLink() {
    return `mailto:${contactConfig.email}`;
  },

  openEmailClient() {
    window.location.href = this.getMailtoLink();
  }
};
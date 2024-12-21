import { motion } from 'framer-motion';

export function SendCampaign() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <h3 className="text-2xl font-semibold">Ready to Send Your Campaign?</h3>
      <p className="text-center text-muted-foreground">
        Review your message and audience one last time before sending.
      </p>
    </motion.div>
  );
}
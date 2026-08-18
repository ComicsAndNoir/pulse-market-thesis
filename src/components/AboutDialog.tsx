import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  Link,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { brandTokens } from '../theme/theme';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * AboutDialog — static "who built this and why" copy, reached from the app
 * bar. Content lives here (not in the thesis model) since it describes the
 * dashboard itself, not the market thesis.
 */
export function AboutDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontFamily: brandTokens.displayFontFamily,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        About this dashboard
        <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
            This dashboard was created from my first impressions about Pulse, and relies heavily
            on publicly available data and assumptions. It&rsquo;s intended as a starting point
            for my thinking around Pulse and the wider suite of Napster products, and something
            that will grow as more data becomes available and stakeholder input is acquired.
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
            It was built from scratch in TypeScript using Claude Code and VS Code, and
            automatically deployed to Render via GitHub. The branding matches Napster&rsquo;s
            styles for ease of reading, and the UI implements Google&rsquo;s Material Design
            system to make it familiar, accessible, and responsive across all device types.
          </Typography>

          <Divider />

          <div>
            <Typography sx={{ fontWeight: 600 }}>Stuart Inskip</Typography>
            <Link href="mailto:stuart.inskip@gmail.com" variant="body2" sx={{ color: 'text.secondary' }}>
              stuart.inskip@gmail.com
            </Link>
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

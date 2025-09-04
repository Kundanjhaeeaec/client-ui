# Intellivia Website Hosting Guide

## Executive Summary
This guide provides cost-effective hosting recommendations for your React-based Intellivia website, targeting a total annual cost of under $15 with professional features.

## Recommended Solution: Netlify + Porkbun
**Total Annual Cost: ~$9**
- **Domain**: Porkbun - $8.18/year (.com)
- **Hosting**: Netlify - Free tier
- **Email**: Gmail forwarding - Free

## Domain Registrar Comparison

### Porkbun (Recommended)
- **.com domain**: $8.18/year
- **Pros**: 
  - Excellent pricing
  - Free WHOIS privacy
  - Good customer support
  - Clean, user-friendly interface
- **Cons**: Smaller company (but reputable)

### Namecheap
- **.com domain**: $13.98/year
- **Pros**: 
  - Well-established
  - Good customer support
  - Free WHOIS privacy
- **Cons**: Slightly more expensive

### Cloudflare
- **.com domain**: $9.15/year
- **Pros**: 
  - At-cost pricing
  - Excellent DNS performance
  - Integrated with other Cloudflare services
- **Cons**: Must transfer domain after 60 days (can't register directly)

### Avoid These Registrars
- **GoDaddy**: Expensive renewals, aggressive upselling
- **Domain.com**: Higher prices, complicated interface

## Hosting Platform Comparison

### Netlify (Recommended)
- **Cost**: Free tier sufficient for your needs
- **Features**:
  - 100GB bandwidth/month
  - Automatic deployments from Git
  - Built-in CDN
  - Custom domain support
  - SSL certificates (free)
  - Contact form handling (100 submissions/month)
- **Perfect for**: React/Vite applications

### Vercel
- **Cost**: Free tier available
- **Features**:
  - Similar to Netlify
  - Excellent Next.js integration
  - Global CDN
- **Note**: Equally good choice, pick based on preference

### GitHub Pages
- **Cost**: Free
- **Limitations**: 
  - Only static sites
  - 100GB bandwidth/month
  - 1GB storage
- **Note**: Works but less features than Netlify

### Traditional Hosting (Not Recommended for React)
- **Shared hosting** (Bluehost, HostGator): $36-60/year
- **Pros**: cPanel, traditional setup
- **Cons**: Overkill for React sites, more expensive

## Email Solutions

### Option 1: Gmail Forwarding (Recommended - Free)
1. Set up email forwarding at domain registrar
2. Forward info@yourdomain.com → your.gmail@gmail.com
3. Send emails from Gmail using your domain name

### Option 2: Gmail Workspace
- **Cost**: $6/month ($72/year)
- **Features**: Professional email, Google Drive, Calendar
- **When to choose**: If you need professional email features

### Option 3: Zoho Mail
- **Cost**: Free for 1 user (5GB storage)
- **Features**: Professional email interface
- **Upgrade**: $1/month for more storage

## Step-by-Step Setup Process

### Phase 1: Domain Purchase
1. **Visit Porkbun.com**
2. **Search for your desired domain**
3. **Add to cart** (should be around $8.18 for .com)
4. **Complete purchase**
5. **Verify WHOIS privacy is enabled** (should be automatic)

### Phase 2: Netlify Setup
1. **Create Netlify account** (free)
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy site** (will get temporary netlify.app URL)

### Phase 3: Domain Connection
1. **In Netlify dashboard**:
   - Go to Domain settings
   - Add your custom domain
   - Note the DNS records Netlify provides
2. **In Porkbun dashboard**:
   - Go to DNS settings
   - Add the DNS records from Netlify
   - Wait 24-48 hours for propagation

### Phase 4: Email Setup
1. **In Porkbun DNS settings**:
   - Add MX record for Gmail forwarding
   - Add CNAME for email forwarding
2. **Test email forwarding**
3. **Configure Gmail to send from your domain**

## Cost Breakdown Summary

| Service | Provider | Annual Cost |
|---------|----------|-------------|
| Domain | Porkbun | $8.18 |
| Hosting | Netlify | $0 |
| Email | Gmail Forwarding | $0 |
| **Total** | | **$8.18** |

## Alternative Budget Options

### Ultra-Budget: GitHub Pages
- **Domain**: Porkbun - $8.18/year
- **Hosting**: GitHub Pages - Free
- **Total**: $8.18/year
- **Limitation**: Less features, manual deployment

### Professional Setup
- **Domain**: Porkbun - $8.18/year
- **Hosting**: Netlify Pro - $19/month
- **Email**: Gmail Workspace - $6/month
- **Total**: $308/year
- **When needed**: High traffic, team collaboration

## Performance Expectations

### Netlify Free Tier Limits
- **Bandwidth**: 100GB/month
- **Build minutes**: 300/month
- **Storage**: 100GB
- **Sites**: Unlimited

### Traffic Estimates
- **Average page size**: ~2MB (React app)
- **Monthly visitors supported**: ~50,000 page views
- **Typical business site**: Uses <10GB/month

## Security Features Included

### SSL Certificates
- **Automatic**: Let's Encrypt certificates
- **Renewal**: Automatic
- **Cost**: Free

### DDoS Protection
- **Netlify**: Built-in protection
- **Cloudflare**: Additional layer (optional)

### Backup Strategy
- **Git repository**: Source code backup
- **Netlify**: Automatic deployment history
- **Domain**: Keep registrar account secure

## Migration Strategy

### From Current Setup
1. **Prepare build**: Ensure `npm run build` works locally
2. **Test deployment**: Deploy to Netlify with temporary URL
3. **Verify functionality**: Test all features on staging
4. **Purchase domain**: Buy through Porkbun
5. **Connect domain**: Update DNS settings
6. **Setup email**: Configure forwarding
7. **Go live**: Update any external links

### Rollback Plan
- **Keep current hosting active** for 30 days
- **DNS TTL**: Set low initially for quick changes
- **Test thoroughly**: Before switching DNS

## Long-term Considerations

### Scaling Up
- **More traffic**: Netlify Pro ($19/month) when needed
- **Team features**: Add collaborators as business grows
- **Advanced email**: Upgrade to Gmail Workspace

### Cost Monitoring
- **Annual domain renewal**: Mark calendar for renewal
- **Traffic monitoring**: Watch Netlify analytics
- **Feature usage**: Monitor contact form submissions

## Support Resources

### Documentation
- **Netlify Docs**: netlify.com/docs
- **Porkbun Support**: porkbun.com/support
- **React Deployment**: vitejs.dev/guide/static-deploy

### Community
- **Netlify Community**: community.netlify.com
- **Stack Overflow**: For technical issues
- **GitHub Issues**: For code-specific problems

## Conclusion

The Porkbun + Netlify combination provides:
- **Professional appearance**: Custom domain with SSL
- **Excellent performance**: Global CDN and fast loading
- **Easy deployment**: Automatic from Git commits
- **Minimal cost**: Under $10/year
- **Scalability**: Can grow with your business

This setup is perfect for a tutoring business website and provides all the professional features you need at an extremely reasonable cost.

---

*Generated on September 3, 2025*
*For: Intellivia Website Project*

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SocialNetworkForGamers.Models.DatabaseModels.Tables;

namespace SocialNetworkForGamers.Models.DatabaseModels.Data.Configuration
{
    public class BackgroundImageConfiguration : IEntityTypeConfiguration<BackgroundImage>
    {
        public void Configure(EntityTypeBuilder<BackgroundImage> builder)
        {
            builder.ToTable("BackgroundImages");

            builder.HasKey(x => x.Id);
        }
    }
}

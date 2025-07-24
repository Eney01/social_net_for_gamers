namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Entity
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public virtual List<AuditLog> AuditLogs { get; set; }
        public Entity()
        {
            AuditLogs = new List<AuditLog>();
        }
    }
}

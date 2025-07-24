namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class AuditLog
    {
        public int Id { get; set; }
        public string Action {  get; set; }
        public DateTime CreatedAt { get; set; }
        public short EntityId {  get; set; }
        public Entity Entity { get; set; }
        public int ActorId {  get; set; }
        public User Actor {  get; set; }
        public AuditLog()
        {
            CreatedAt = DateTime.Now;
        }
    }
}

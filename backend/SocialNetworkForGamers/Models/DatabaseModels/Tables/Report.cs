namespace SocialNetworkForGamers.Models.DatabaseModels.Tables
{
    public class Report
    {
        public int Id { get; set; }
        public string Reason {  get; set; }
        public DateTime CreatedAt { get; set; }
        public short StatusId {  get; set; }
        public ReportStatus Status { get; set; }
        public int ReporterId {  get; set; }
        public User Reporter { get; set; }
        public long? ReportedPostId { get; set; }
        public Post? ReportedPost {  get; set; }
        public int? ReportedUserId {  get; set; }
        public User? ReportedUser {  get; set; }
    }
}
